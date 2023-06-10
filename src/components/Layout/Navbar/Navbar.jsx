import React from 'react'
import "./Navbar.scss"
import { Input, Text } from "@chakra-ui/react"
import { RiPlayList2Fill } from "react-icons/ri"
import Header from '../Header/Header'
import { useSelector } from 'react-redux'
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"



const Navbar = () => {
    const { isAuthenticated, user } = useSelector(
        state => state.user)
    return (
        <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <div className="nav-container">
                <div className="input-field">
                    <div className="input-f"> <Input className='input-field1' placeholder={"Search a course"} focusBorderColor="yellow.400" /></div>
                </div>
                <div className="right-side">
                    <div className="playlist">
                        <RiPlayList2Fill />
                    </div>
                    <div className="category">
                        <a href="">catgories</a>
                    </div>
                    <div className="login">
                        <Text children={"Login"} />
                    </div>
                    <div className="Sign up">
                        <Text children={"Sign up"} />
                    </div>
                    <div className="colorMode">
                        <ColorModeSwitcher />
                    </div>

                </div>


            </div>
        </>
    )
}

export default Navbar