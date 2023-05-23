import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Grid, Box, Heading, Stack, Text, Button, VStack, Input, ModalFooter } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import { fileUploadCss } from '../../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseLectures } from '../../../redux/action/courseAction'
import { toast } from 'react-hot-toast'

const CourseModal = ({ isOpen,lectures=[],clear, onClose, courseId, deleteLectureHandler, courseTitle,

    addLectureHandler
}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");
    const dispatch = useDispatch();
    const {  loading}  = useSelector(state=>state.admin)
    
    const clearForm =() =>{
        setTitle("");
        setDescription("");
        setVideo("");
        setVideoPrev("");
    }


    const changeVideoHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setVideoPrev(reader.result);
            setVideo(file);
        }
    }

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setVideo("");
        setVideoPrev("");
        onClose();
    }
    useEffect(()=>{
        clearForm();
    },[clear])
   

    return (
        <Modal

            isOpen={isOpen}
            size="full"
            onClose={handleClose}
            scrollBehavior='outline'

        >

            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        {courseTitle}
                    </ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody p="16" >
                        <Grid templateColumns={["1fr", "3fr 1fr"]} >
                            <Box px={["0", "16"]} >
                                <Box my="5" >
                                    <Heading>{courseTitle}</Heading>
                                    <Heading size="sm"
                                        opacity={0.4}
                                    >
                                        {`${courseId}`}
                                    </Heading>
                                </Box>
                                <Heading size="lg" >
                                    Lectures
                                </Heading>
                                {
                                    lectures.map((item, i) => (
                                        <VideoCard
                                            key={i}
                                            title={item.title}
                                            description={item.description}
                                            num={i + 1}
                                            lectureId={item._id}
                                            courseId={courseId}
                                            deleteLectureHandler={deleteLectureHandler}
                                            loading={loading}
                                        />
                                    ))
                                }
                            </Box>

                            <Box>
                                <form onSubmit={(e)=> addLectureHandler(e,courseId, title, description, video)}>
                                    <VStack spacing="4" >
                                        <Heading size="md"
                                            textTransform="uppercase "
                                        >Add Lecture</Heading>

                                        <Input focusBorderColor='purple.300' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

                                        <Input focusBorderColor='purple.300' placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />

                                        <Input
                                            accept='video/mp4'
                                            required
                                            type={'file'}
                                            focusBorderColor='purple.300'
                                            css={{
                                                '&::file-selector-button':
                                                {
                                                    ...fileUploadCss,
                                                    color: "purple",
                                                }
                                            }}

                                            onChange={changeVideoHandler}
                                        />

                                        {
                                            videoPrev && (
                                                <video controlsList='nodownload' controls src={videoPrev} ></video>
                                            )
                                        }

                                        <Button w="full" colorScheme='purple' type="submit" isLoading={loading} >
                                            Upload Lecture
                                        </Button>

                                    </VStack>
                                </form>
                            </Box>
                        </Grid>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose}  >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </ModalOverlay>

        </Modal>
    )


}

export default CourseModal

function VideoCard({ title, description, num, lectureId, courseId, deleteLectureHandler,loading }) {

    return <Stack direction={["column", "row"]} my="8" boxShadow={"0 0 10px rgba(107, 70, 193, 0.5 )"} justifyContent={["flex=start", "space-between"]} p={["4", "8"]} >
        <Box  >
            <Heading>{`#${num}  ${title}`}</Heading>
            <Text children={description} ></Text>

        </Box>
        <Button color={'red'} onClick={() => deleteLectureHandler(courseId, lectureId)} isLoading={loading} >
            <RiDeleteBin7Fill />
        </Button>

    </Stack>

}