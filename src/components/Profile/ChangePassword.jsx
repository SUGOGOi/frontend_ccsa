import { Container, Heading, Input, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/action/profileAction';
import { toast } from 'react-hot-toast';
import { loaduser } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    


    const submitHandler = async(e) =>{

        e.preventDefault();

        await dispatch(changePassword(oldPassword,newPassword));

        setTimeout(async()=>{
            await dispatch(loaduser())
        },3000) 

           navigate("/profile");
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
        <form onSubmit={submitHandler} >
            <Heading textTransform={"uppercase"} children="Change Password" my="16" textAlign={["center", "left"]} />
            <Input required id="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder={" Old Password"} type={"password"} focusBorderColor="yellow.500" />

            <Input mt="8" mb="8" required id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={" New Password"} type={"password"} focusBorderColor="yellow.500" />

            <Button isLoading={loading} w="full" colorScheme={"yellow"} type="submit" > Change</Button>
        </form>

    </Container>
}

export default ChangePassword