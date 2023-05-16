import React, { useEffect, useState } from 'react'
import { Container, Heading, Input, Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/action/profileAction';
import toast,{Toaster} from "react-hot-toast"
import { loaduser } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = (user) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const navigate = useNavigate();


    const dispatch = useDispatch();


    const submitHandler = async(e) =>{
        e.preventDefault();

       await dispatch(updateProfile(name,email));
       setTimeout(async()=>{
        await dispatch(loaduser())
    },3000)
        navigate("/profile")
       
    }

    const {loading,error,message} = useSelector(state => state.profile);

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }

        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"})
        }
    },[dispatch,error,message])
    return <Container py="16" minH="90vh">
        <form onSubmit={submitHandler} method='PUT' >
            <Heading textTransform={"uppercase"} children="Update Profile" my="16" textAlign={["center", "left"]} />
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={"Name"} type={"text"} focusBorderColor="yellow.500" />

            <Input mt="8" mb="8" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} type={"email"} focusBorderColor="yellow.500" />

            <Button isLoading={loading} w="full" colorScheme={"yellow"} type="submit" >Update</Button>
        </form>

    </Container>
}

export default UpdateProfile