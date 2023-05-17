import React, { useEffect } from 'react'
import { Container, Heading, Input, VStack, Button } from "@chakra-ui/react"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { forgetPassword } from '../../redux/action/profileAction';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading,error,message} = useSelector(state => state.profile)
    const navigate = useNavigate();

    const submitHandler = async(e) =>{
        e.preventDefault();
        await dispatch(forgetPassword(email));
        setTimeout(()=>{
            navigate("/")
        },3000)
    }

    useEffect(() =>{
        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"})
        }

    },[dispatch,error,message])



    return <Container py="16" h={"90vh"}>
        <form onSubmit={submitHandler} method="POST" >
            <Heading children="Forget Password" my="16" textTransform={"uppercase"} textAlign={["center"]} />
            <VStack spacing={"8"}>
                <Input required id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"example@gmail.com"} type={"email"} focusBorderColor="yellow.500" />
                <Button  isLoading={loading} type="submit" colorScheme={"yellow"} w={"full"} >
                    Send Reset Link
                </Button>

            </VStack>
        </form>

    </Container>
}

export default ForgetPassword