import { Box, VStack, Stack, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { TiSocialYoutubeCircular, TiSocialInstagramCircular } from "react-icons/ti"
import { DiGithub } from "react-icons/di"
import { FaFacebook } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import { Link } from 'react-router-dom';
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
                        <Link to="">Web development</Link>
                        <Link to="">Android Development</Link>
                        <Link to="">Data Structure</Link>
                        <Link to="/courses">view all</Link>
                    </div>
                    <div className="subscription-plans">
                        <p>Subscription plans</p>
                        <hr />
                        <Link to="/subscribe">Pro Pack ₹299</Link>
                    </div>
                    <div className="center">
                        <p>Center</p>
                        <hr />
                        <Link to="/about">About us</Link>
                        <Link to="/request">Request course</Link>
                        <Link to="/contact">Contact us</Link>
                    </div>
                </div>
            </div>
            <div className="footer-content-2">
                <div className="icons">
                    <div><a href="https://www.youtube.com/">< TiSocialYoutubeCircular /></a></div>
                    <div><a href="https://www.instagram.com/">< TiSocialInstagramCircular /></a></div>
                    <div><a href="https://www.github.com/">< DiGithub /></a></div>
                    <div><a href="https://www.facebook.com/"><  FaFacebook /></a></div>
                    <div><a href="https://www.linkedin.com/authwall?trk=qf&original_referer=https://in.linkedin.com/&sessionRedirect=https%3A%2F%2Fin.linkedin.com%2F%3Foriginal_referer%3Dhttps%253A%252F%252Fwww.google.com%252F"><  AiFillLinkedin /></a></div>
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