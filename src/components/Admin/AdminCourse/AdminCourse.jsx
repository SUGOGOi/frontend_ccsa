import { Grid, Box, Heading, TableContainer, Table, TableCaption, Thead, Th, Tr, Button, Td, Tbody, Image, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from "../Sidebar"
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllCourses, getCourseLectures } from '../../../redux/action/courseAction'
import { toast } from 'react-hot-toast'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/action/adminAction'


const AdminCourse = () => {

    const { isOpen, onClose, onOpen } = useDisclosure()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {lectures,courses} = useSelector(state=>state.course);
    const {message,loading,error} = useSelector(state=>state.admin);
    const [courseId,setCourseId] = useState();
    const [courseTitle,setCourseTitle] = useState();
    const [clear,setClear] = useState();

    const courseDetailHandler = (courseId,title) => {
        setCourseId(courseId);
        setCourseTitle(title)
        dispatch(getCourseLectures(courseId))
        onOpen();
        
    }
    const deleteButtonhandler = async(courseId) => {
       await dispatch(deleteCourse(courseId));
       setTimeout(()=>{
        dispatch(getAllCourses());
       },1500)
    }

    const deleteLectureHandler = async(courseId, lectureId) => {
        await dispatch(deleteLecture(courseId,lectureId))
        setTimeout(()=>{
            dispatch(getCourseLectures(courseId))
           },1500)


    }


    const  addLectureHandler = async(e, courseId, title, description, video) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("title",title);
        myForm.append("description",description);
        myForm.append("file",video);

        await dispatch(addLecture(courseId,myForm));
        setClear("true");
        console.log(clear);
        dispatch(getCourseLectures(courseId))
        setTimeout(()=>{
            setClear("")
        },5000)

    }


    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"});
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"});
        }
        dispatch(getAllCourses());
        
    },[dispatch,error,message])



    return <Grid css={{ cursor: `url(${cursor}), default` }} minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]} >
        <Box
            padding={["0", "16"]}
            overflow="auto"
        >
            <Heading
                textTransform={'uppercase'}
                children="All Courses"
                my={"16"}
                textAlign={["center", "left"]}
            />
            <TableContainer w={["100vw", "full"]}  >
                <Table variant={"simple"} size="lg" >
                    <TableCaption>All available courses in database</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Poster</Th>
                            <Th>Title</Th>
                            <Th>Category</Th>
                            <Th>Created By</Th>
                            <Th isNumeric >Views</Th>
                            <Th isNumeric >Lectures</Th>
                            <Th isNumeric >Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            courses.map(item => (
                                <Row deleteButtonhandler={deleteButtonhandler} courseDetailHandler={courseDetailHandler} loading={loading} key={item._id} item={item} />

                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <CourseModal isOpen={isOpen}
                onClose={onClose}
                courseId={courseId}
                courseTitle={courseTitle}
                deleteLectureHandler={deleteLectureHandler}
                addLectureHandler={addLectureHandler}
                lectures={lectures}
                clear={clear}
            />
        </Box>
        <Sidebar />

    </Grid>
}
export default AdminCourse

function Row({ item, courseDetailHandler, deleteButtonhandler,loading }) {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>
                <Image src={item.poster.url} />
            </Td>
            <Td>{item.title}</Td>
            <Td textTransform={'uppercase'} >{item.category}</Td>
            <Td>{item.createdBy}</Td>
            <Td isNumeric >{item.views}</Td>
            <Td isNumeric >{item.numOfVideos}</Td>
            <Td isNumeric>
                <Button varient={"outline"} color={"purple.500"} onClick={() => courseDetailHandler(item._id,item.title)} >View Lectures</Button>
                <Button color={"red"} onClick={() => deleteButtonhandler(item._id) } isLoading={loading} ><RiDeleteBin7Fill /> </Button>
            </Td>
        </Tr>
    )
}

