import React, { useEffect } from 'react'
import { Container, Heading, Input, VStack, Button } from "@chakra-ui/react"
import { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/action/profileAction';
import { toast } from 'react-hot-toast';



const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    
    const dispatch = useDispatch()
    const {loading,error,message} = useSelector(state=>state.profile)

    const submitHandler = async(e)=>{
        e.preventDefault();
        await dispatch(resetPassword(params.token,password));
        setTimeout(()=>{
            navigate("/login")
        },3000)

    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"})
        }

    },[dispatch,error,message]);

    return <Container py="16" h={"90vh"}>
        <form onSubmit={submitHandler} method='POST'>
            <Heading children="Reset Password" my="16" textTransform={"uppercase"} textAlign={["center"]} />
            <VStack spacing={"8"}>
                <Input required id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Enter New Password"} type={"password"} focusBorderColor="yellow.500" />

                <Button type="submit" colorScheme={"yellow"} w={"full"} isLoading={loading}>
                    Reset Password
                </Button>

            </VStack>
        </form>

    </Container>
}

export default ResetPassword