import { Grid, Container, Heading, VStack, Input, Select, Image, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from "../Sidebar"
import { useState } from 'react'
import { fileUploadCss } from '../../Auth/Register'
import { createCourse } from '../../../redux/action/adminAction'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'






const CreateCourse = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [imagePrev, setImagePrev] = useState('');
    const dispatch = useDispatch();
    const {loading, error, message} = useSelector(state=> state.admin);
    const navigate = useNavigate();

    const categories = [
        "Web Development", "Android Development", "Data Structures & Algorithems", "AI", "Data Science"
    ]

    const changeImageHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }

    const createCourseHandler = async(e) =>{
        e.preventDefault();
        const myForm =  new FormData();
        myForm.append("title",title);
        myForm.append("description",description);
        myForm.append("createdBy",createdBy);
        myForm.append("category",category);
        myForm.append("file",image);

        await dispatch(createCourse(myForm));
        setTimeout(()=>{
            navigate("/admin/courses")

        },1500)
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
    },[dispatch,error,message])


    return <Grid css={{ cursor: `url(${cursor}), default` }} minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]} >

        <Container py="8">
            <form onSubmit={createCourseHandler} >
                <Heading textTransform={'uppercase'} children="Create Course" my="16" textAlign={["center", "left"]} />

                <VStack m="auto" spacing={"8"} >
                    <Input id="name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Title"} type={"text"} focusBorderColor="purple.300" />

                    <Input id="name" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={"Description"} type={"text"} focusBorderColor="purple.300" />

                    <Input id="name" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} placeholder={"Creator Name"} type={"text"} focusBorderColor="purple.300" />

                    <Select focusBorderColor="purple.300" value={category} onChange={(e) => setCategory(e.target.value)} >
                        <option value="" >Category </option>
                        {
                            categories.map(item => (
                                <option key={item} value={item} >{item}</option>
                            ))
                        }

                    </Select>
                    <Input
                        accept='image/*'
                        required
                        type={"file"}
                        focusBorderColor='purple.300'
                        css={{
                            '&::file-selector-button': {
                                ...fileUploadCss,
                                color: 'purple',
                            },
                        }}
                        onChange={changeImageHandler}
                    />

                    {
                        imagePrev && (
                            <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
                        )}

                    <Button isLoading={loading} w="full" colorScheme={"purple"} children="Create Course" type='submit' />

                </VStack>
            </form>

        </Container>
        <Sidebar />

    </Grid>
}

export default CreateCourse