import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { BsEye, BsEyeSlash } from 'react-icons/bs'

import ValidateLocalToken from '../../functions/ValidateLocalToken'
import ValidateSessionToken from '../../functions/ValidateSessionToken'
const red = '#D4145A';
const orange = '#FBB03B';
const green = 'rgb(21, 202, 81)'

const LoginFormContainer = styled.div`
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

const RememberMe = styled.div`
    margin : 10px auto 10px 10%;

    display : flex;
    align-items : center;
`

const RememberMeCheckbox = styled.input`
    height : 20px;
    width : 20px;
`

const RememberMeLable = styled.label`
    font-size : 20px;
    font-family : Bahnschrift;
`

const LoginButton = styled(motion.button)`
    width : 80%;
    height : 50px;
    margin : 10px 0px;

    font-size : 25px;
    font-family : Bahnschrift;
    border-radius : 5px;
    outline : none;
    border : none;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
    color: white;
    background : linear-gradient(to right, ${red}, ${orange});
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

const ForgotPasswordLink = styled.a`
    margin : 20px auto 10px 10%;

    text-align : left;
    font-size : 22px;
    font-family : Bahnschrift;
    color : ${red};
`

const LoginForm = () => {

    let history = useHistory();
    const AuthenticateUser = async () =>
    {
        const res = await ValidateLocalToken();
        const sessionRes = await ValidateSessionToken();

        if(res === true || sessionRes === true)
        {   
            history.push('/');
    
        }
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberOnDevice, setRememberOnDeivce] = useState(false);
    const [responseMsg, setResponseMsg] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const SendLoginRequest = async () =>
    {
        try
        {
            const res = await axios.post('https://news-app-api-22.herokuapp.com/auth/login',
            {
                'username' : username,
                'password' : password,
                'rememberOnDevice' : rememberOnDevice
            })

            console.log(res.data);

            if(res.data.msg === "User doesn't exist" || res.data.msg === "Incorrect Password")
            {
                setResponseMsg(res.data.msg);
            }
            
            else if(res.data.msg === "token created" || res.data.msg === 'logged In for session')
            {
                setResponseMsg("Login Successful");
            }

            //setting token
            if(res.data.loggedIn === true)
            {
                if(res.data.msg === "token created")
                {
                    localStorage.setItem('accessToken', res.data.accessToken);
                }

                else if(res.data.msg === "logged In for session")
                {
                    sessionStorage.setItem('accessToken', res.data.sessionToken);
                }

                history.push('/');
            }
            else if(res.data.loggedIn === false)
            {
                console.log(res.data.msg);
            }

        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() =>
    {
        AuthenticateUser();
    });


    return (
        <LoginFormContainer>
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
            
            <RememberMe>
                <RememberMeCheckbox type='checkbox' id='rememberMeCheckbox' onChange={(e) => setRememberOnDeivce(e.target.checked)}/>
                <RememberMeLable htmlFor='rememberMeCheckbox'>Remember me on this device?</RememberMeLable>
            </RememberMe>
            
            <LoginButton
            whileTap={{scale : 0.95}}
            onClick={SendLoginRequest}>Login</LoginButton>
            
            {responseMsg === "User doesn't exist" || responseMsg === "Incorrect Password" ?
            <ErrorMessage>{responseMsg}</ErrorMessage> : <></>}

            {responseMsg === "token created" || responseMsg === 'logged In for session' ?
            <SuccessMessage>Logged In</SuccessMessage> : <></>}
            
            <ForgotPasswordLink href='/login/forgotpassword'>Forgot Password?</ForgotPasswordLink>

            
        </LoginFormContainer>
    )
}

export default LoginForm
