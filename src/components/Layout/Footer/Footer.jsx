import { Box, VStack, Stack, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { TiSocialYoutubeCircular, TiSocialInstagramCircular } from "react-icons/ti"
import { DiGithub } from "react-icons/di"
import { FaFacebook } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import "./Footer.scss"

const Footer = () => {
    return <div className="footer">
        <div className="footer-body">
            <div className="footer-content">
                <div className="heading">
                    <h3>
                        CCSA
                    </h3>
                </div>
                <div className="details">
                    <div className="categories">
                        <p>Categories</p>
                        <hr />
                        <a href="">Web development</a>
                        <a href="">Android Development</a>
                        <a href="">Data Structure</a>
                        <a href="">view all</a>
                    </div>
                    <div className="subscription-plans">
                        <p>Subscription plans</p>
                        <hr />
                        <a href="">Pro Pack ₹299</a>
                    </div>
                    <div className="center">
                        <p>Center</p>
                        <hr />
                        <a href="">About us</a>
                        <a href="">Request course</a>
                        <a href="">Contact us</a>
                    </div>
                </div>
            </div>
            <div className="footer-content-2">
                <div className="icons">
                    <div><a href="">< TiSocialYoutubeCircular /></a></div>
                    <div><a href="">< TiSocialInstagramCircular /></a></div>
                    <div><a href="">< DiGithub /></a></div>
                    <div><a href=""><  FaFacebook /></a></div>
                    <div><a href=""><  AiFillLinkedin /></a></div>
                </div>
                <div className="footer-content-2-down">
                    <p>Terms & conditions</p>
                </div>


            </div>
        </div>
        <div className="footer-copyright">
            <p id="footer-copy" >Copyright CCSA 2023, All rights reserved.</p>

        </div>

    </div>
}

export default Footer