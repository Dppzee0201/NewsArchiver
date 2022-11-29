import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { BsEye, BsEyeSlash } from 'react-icons/bs'

const red = '#D4145A';
const orange = '#FBB03B';
const green = 'rgb(21, 202, 81)'

const SignupFormContainer = styled.div`
    width : 100%;
    margin : 30px 0px;
    display : flex;
    flex-direction : column;
    align-items : center;
`

const TextInput = styled.input`
    width : 75%;
    height : 50px;
    padding : 0px 10px;
    margin : 10px 0px;

    font-size : 22px;
    font-family : Bahnschrift;
    border : 1px solid rgb(20, 20, 20);
    border-radius : 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
`

const SignupButton = styled(motion.button)`
    width : 80%;
    height : 50px;
    margin : 20px 0px;

    font-size : 25px;
    font-family : Bahnschrift;
    border-radius : 5px;
    outline : none;
    border : none;
    background : linear-gradient(to right, ${red}, ${orange});
    color: white;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
    cursor : pointer;
`
const ErrorMessage = styled.h3`
    width : 80%;
    height : 35px;
    
    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 22px;
    font-family : Bahnschrift;
    text-align : center;
    border-radius : 5px;
    background : ${orange};
`

const SuccessMessage = styled.h3`
    width : 80%;
    height : 35px;
    
    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 22px;
    font-family : Bahnschrift;
    text-align : center;
    border-radius : 5px;
    background : ${green};
`
const SignupForm = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMsg, setResponseMsg] = useState();
    const [showPassword, setShowPassword] = useState(false);
    
    const SendSignupRequest = async () =>
    {
        try
        {
            const res = await axios.post('https://news-app-api-22.herokuapp.com/auth/signup',
            {
                'username' : username,
                'password' : password
            })

            if(res.data.msg === 'user already exists')
            {
                setResponseMsg('user already exists');
            }
            else if(res.data.msg === 'Signed Up successfully')
            {
                setResponseMsg('Signed Up successfully');
            }
        }catch(err)
        {
            console.log(err);
        }
    }
    
    return (
            <SignupFormContainer>
                <TextInput 
                placeholder='Username'
                type='text'
                onChange={(e) => setUsername(e.target.value)}></TextInput>
                
                <TextInput 
                placeholder='Password' 
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}></TextInput>
                
                {showPassword ?
                    <BsEye className='toogle-show-password' size={25} onClick={() => setShowPassword(false)}></BsEye> :
                    <BsEyeSlash className='toogle-show-password' size={25} onClick={() => setShowPassword(true)}></BsEyeSlash>
                }

                <SignupButton 
                whileTap={{scale : 0.95}}
                onClick={SendSignupRequest}>Sign-Up</SignupButton>

                {responseMsg === "user already exists" ?
                <ErrorMessage>User already Exists!</ErrorMessage> : <></>}

                {responseMsg === 'Signed Up successfully' ?
                <SuccessMessage>Signed Up Successfully!</SuccessMessage> : <></>}

            </SignupFormContainer>
    )
}

export default SignupForm
