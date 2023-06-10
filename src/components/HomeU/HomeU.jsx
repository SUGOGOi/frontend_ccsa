import React from 'react'
import Navbar from '../Layout/Navbar/Navbar';
import "./HomeU.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from "../../assets/images/image1.jpg"
import image2 from "../../assets/images/image2.jpg"
import image3 from "../../assets/images/image3.jpg"

const HomeU = () => {
    return (
        <>
            <div className="home-container">


                <Carousel className='carousel' autoPlay={true} infiniteLoop={true} transitionTime="2000" showThumbs={false} showIndicators={false} showStatus={false} showArrows={false} >
                    <div>
                        <img src={image1} />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={image2} />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={image3} />
                        <p className="legend">Legend 1</p>
                    </div>
                </Carousel>

            </div>

            <div className="home-container2">

            </div>
        </>
    )
}

export default HomeU