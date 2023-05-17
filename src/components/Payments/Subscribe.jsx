import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { buySubscription } from '../../redux/action/userAction'
import axios from 'axios'
import { server } from '../../redux/store'
import { toast } from 'react-hot-toast'
import logo from "../../assets/ccsa-logo.png"
import { useNavigate } from 'react-router-dom'

const Subscribe = ({user}) => {
    const {subscriptionId,error,loading} = useSelector(state=>state.subscription)
    const {error: subscribeError} = useSelector(state =>state.course)
    const [key,setKey] = useState("")
    const dispatch = useDispatch();

    const subscriptionHandler = async() =>{

        const {data} = await axios.get(`${server}/razorpaykey`)
        setKey(data.key)
        await dispatch(buySubscription());
    }

    useEffect(()=>{

        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }

        if(subscribeError){
            toast.error(subscribeError);
            dispatch({type:"clearError"})
        }
        
        if(subscriptionId){
            const openPopUp = () =>{
                const options = {
                    key,
                    name:"CCSA",
                    description:"Get access to all premium content",
                    image:logo,
                    subscription_id:subscriptionId,
                    callback_url:`${server}/paymentverification`,
                    prefill:{
                        name:user.name,
                        email:user.email,
                        contact:""
                    },
                    notes:{
                        address:"Dibrugarh University"
                    },
                    theme:{
                        color:"#FFC800"
                    }


                }

                const razor  =  new window.Razorpay(options);
                razor.open();
            };
            openPopUp();
        }
    },[dispatch,error,user.name,user.email,key,subscriptionId,subscribeError])

    return <Container h="90vh" padding="16"  >
        <Heading children="Subscribe" m="8" textAlign={"center"} />
        <VStack boxShadow={"lg"} alignItems="stretch" borderRadius={"lg"} spacing="0" >
            <Box bg="yellow.400" p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
                <Text color={"black"} children={`Pro Pack - ₹299.00`} />
            </Box>
            <Box p="4" >
                <VStack textAlign={"center"} px="8" mt="4" spacing="8" >
                    <Text children={`Join Pro Pack and get access to all content`} />
                    <Heading children={"₹299 Only"} size="md" />
                </VStack>
                <Button  isLoading={loading} onClick={subscriptionHandler} my="8" w="full" colorScheme={"yellow"} >Buy Now</Button>
            </Box>
            <Box bg="blackAlpha.600" p="4" css={{ borderRadius: "0 0 8px 8px" }} >
                <Heading color={"white"} textTransform="uppercase" children={"100% refund at cancellation"} size="sm" />
                <Text fontSize={"xs"} color="white" children={"Terms and Conditions Apply"} />
            </Box>
        </VStack>


    </Container>
}

export default Subscribe