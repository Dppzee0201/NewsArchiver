import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion'
import styled from 'styled-components'
import SignupForm from '../components/Login/SignupForm';

import '../CSS/Login.css'
import LoginForm from '../components/Login/LoginForm';


const red = '#D4145A';
const orange = '#FBB03B';

const PageContainer = styled.div`
    min-height : 100vh;
    min-width : 100vw;
    height : fit-content;

    display : flex;
    align-items : center;
    justify-content : center;

    background : linear-gradient(to right, ${red}, ${orange});
`

const LoginContainer = styled.div`
    height : 640px;
    width : 400px;

    display : flex;
    flex-direction : column;
    align-items : center;

    border-radius : 5px;
    background : rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    backdrop-filter : blur(5px);
`
const Title = styled.h3`
    height : auto;
    width : auto;
    margin : 30px 0px;
    font-family : 'Bahnschrift';
    font-size : 40px;
`

const ButtonGroup = styled.div`
    margin : 0px 0px;
    display : flex;
    align-items : center;

`

const SignupButton = styled(motion.button)`
    height : 50px;
    width : 150px;
    padding : 5px 20px;
    margin : 10px;


    font-size : 25px;
    font-weight : 100;
    font-family : 'Bahnschrift';
    outline : none;
    border : none;
    background : rgb(230, 230, 230);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
    border-radius : 5px;
    color : black;
    cursor : pointer;
 `

const LoginButton = styled(motion.button)`
    height : 50px;
    width : 150px;
    padding : 5px 20px;
    margin : 10px;


    font-size : 1.6rem;
    font-weight : 100;
    font-family : 'Bahnschrift';
    outline : none;
    border : none;
    background : rgb(230, 230, 230);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
    border-radius : 5px;
    color : black;
    cursor : pointer;
`

const activeTabCSS = 
{
    background : `linear-gradient(to right , ${red}, ${orange})`,
    color : 'white'
}


const Login = () => {

    const [activeTab, setActiveTab] = useState('login');
    
    return (
        <PageContainer>
            <LoginContainer>
                <Title>Sign-In</Title>
                <ButtonGroup>
                    
                    <SignupButton 
                    style={activeTab === 'sign-up' ? activeTabCSS : null} 
                    whileTap={{scale : 0.95}}
                    onClick={() => setActiveTab('sign-up')}>
                        Sign-Up
                    </SignupButton>
                    
                    <LoginButton 
                    style={activeTab === 'login' ? activeTabCSS : null} 
                    whileTap={{scale : 0.95}}
                    onClick={() => setActiveTab('login')}>
                        Login
                    </LoginButton>

                </ButtonGroup>
                {activeTab === 'sign-up' ? <SignupForm/> : <LoginForm/>}
                
            </LoginContainer>
        </PageContainer>
    )
}

export default Login
