import React, { useEffect ,useState} from 'react'
import { Container, Heading, HStack, Input, Button, Text, Stack, VStack, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/action/courseAction'
import { toast } from 'react-hot-toast'
import { addToPlaylist } from '../../redux/action/profileAction'
import { loaduser } from '../../redux/action/userAction';

// import "../Home/Home.css"

const Course = ({ views, title, imageSrc, id,loading, addToPlaylistHandler, creator, description, lectureCount }) => {

    return (

        <VStack className="course" alignItems={["center", "flex-start"]}>
            <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
            <Heading textAlign={["center", "left"]} maxW="200px" fontFamily={"sans-serif"} noOfLines={3} children={title}
                size={"sm"} />
            <Text children={description} noOfLines={2} />
            <HStack>
                <Text children={"Creator"} fontWeight={"bold"} textTransform={"uppercase"} />
                <Text children={creator} fontFamily={"body"} textTransform={"uppercase"} />
            </HStack>
            <Heading textAlign={"center"} size="xs" children={`Lecture - ${lectureCount}`} texttransform={"uppercase"} />
            <Heading size="xs" children={`Views - ${views}`} texttransform={"uppercase"} />
            <Stack direction={["column", "row"]} alignItems="center">
                <Link to={`/course/${id}`}>
                    <Button colorScheme={"yellow"}>Watch Now!</Button>
                </Link>
                <Button isLoading={loading} colorScheme={"yellow"} variant={"ghost"} onClick={() => addToPlaylistHandler(id)}>Add to Playlist</Button>

            </Stack>

        </VStack>

    )
}

const Courses = () => {

    const [keyword, setkeyword] = useState("");
    const [category, setCategory] = useState("");
    const {loading,courses,error,message} = useSelector(state => state.course)
    const dispatch = useDispatch();

    const addToPlaylistHandler = async(courseId) => {
        // console.log("Added to playlist",courseId)
        await dispatch(addToPlaylist(courseId));
        setTimeout(()=>{
            dispatch(loaduser());
        },3000)
    }

    const categories = [
        "Web dev", "Android Development", "Data Structures & Algorithems", "AI", "Data Science"
    ]

    
    useEffect(()=>{
        dispatch(getAllCourses(category,keyword))
        if(error){
            toast.error(error)
            dispatch({type:"clearError"});
        }

        if(message){
            toast.success(message)
            dispatch({type:"clearMessage"});
        }
        // if(category != ""){
        //     setCategory("")
        // }

    },[dispatch,category,keyword,error,message])


    return (
        <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
            <Heading margin={"8"} >All Courses</Heading>
            <Input value={keyword} onChange={e => setkeyword(e.target.value)} placeholder="Search a course" type={"text"}
                focusBorderColor="yellow.500"
            />

            <HStack overflowX={"auto"} paddingY="8" css={{ "&::-webkit-scrollbar": { display: "none" } }}>
                {

                    categories.map((item, index) => (
                        <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
                            <Text children={item} />
                        </Button>
                    ))
                }
            </HStack>
            <Stack
                direction={["column", "row"]}
                flexWrap="wrap"
                justifyContent={["flex-start", "space-evenly"]}
                alignItems={["center", "flex-start"]}
            >
                {
                     
                    courses.length > 0 ? courses.map((item)=>(
                        <Course
                        key={item._id}
                        title={item.title}
                        description={item.description}
                        views={item.views}
                        imageSrc={item.poster.url}
                        id={item._id}
                        creator={item.createdBy}
                        lectureCount={item.numOfVideos}
                        addToPlaylistHandler={addToPlaylistHandler}
                        loading={loading}
                    />  
                    )) : <Heading mt="4" children={"Course not found"}/>
                    
                    
                }

            </Stack>

        </Container >
    )
}

export default Courses