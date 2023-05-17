import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "./CoursePage.css"
import {useDispatch, useSelector} from "react-redux"
import {Navigate, useParams} from "react-router-dom"
import { getCourseLectures } from '../../redux/action/courseAction'
import Loader from "../Layout/Loader/Loader"

const CoursePage = ({user}) => {

    const [lectureNumber, setLectureNumber] = useState(0);
    const {lectures,loading} = useSelector(state=>state.course)
    
    const dispatch  = useDispatch();
    const params = useParams();


    useEffect(()=>{
        dispatch(getCourseLectures(params.id));
    },[dispatch,params.id])

    if(user.role !== "admin" && (user.subscription === undefined || user.subscription.status !== "active")){
        return <Navigate to={"/subscribe"}  />
    }

    return (
        loading ? <Loader/>:(

            <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]} >
        {
            lectures && lectures.length >0 ? <>
            <Box >

<div className='video'>
    <video
        width={"90%"}
        controls
        controlsList="nodownload  noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        src={lectures[lectureNumber].videos.url}>
    </video>
</div>

<Heading m="4" >{`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}</Heading>
<Heading m="4" >Description</Heading>
<Text m="4" >{lectures[lectureNumber].description}</Text>
</Box>

<VStack pt={"12"} boxShadow={"-2px 0 10px rgb(255, 238, 88)"} >
{
    lectures.map((item, index) => (
        <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
                width: "100%",
                padding: "1rem",
                textAlign: "center",
                margin: 0,
                borderBottom: "1px solid rgba(0,0,0,0.2)"
            }}
        >
            <Text noOfLines={1} >#{index + 1} {item.title}</Text>
        </button>
    ))
}
    </VStack>
            </>:(<Heading children={"No lectures"} />)
        }
    </Grid>
        )
    );
}

export default CoursePage