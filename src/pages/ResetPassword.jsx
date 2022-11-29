import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const red = '#D4145A';
const orange = '#FBB03B';
// const purple = '#662D8C';
// const pink = '#ED1E79';
const green = 'rgb(21, 202, 81)';
const blue = '#02AABD';
const teal = '#00CDAC';

const PageContainer = styled.div`
    min-height : 100vh;
    min-width : 100vw;
    height : fit-content;

    display : flex;
    align-items : center;
    justify-content : center;

    background : linear-gradient(to right, ${red}, ${orange});
`

const MenuContainer = styled.div`
    height : 600px;
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
    margin : 40px 0px 0px 0px;
    font-size : 40px;
    font-family : Bahnschrift;
`

const Description = styled.p`
    font-size : 20px;
    font-family : Bahnschrift;
`
const FormContainer = styled.div`
    width : 100%;
    margin : 10px 0px;
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

const ResetButton = styled(motion.button)`
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

const GoToLoginButton = styled(motion.div)`
    width : 80%;
    height : 50px;
    margin : 10px 0px;

    display : flex;
    align-items : center;
    justify-content : center;

    font-size : 25px;
    font-family : Bahnschrift;
    border-radius : 5px;
    outline : none;
    border : none;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
    color: white;
    background : linear-gradient(to right, ${blue}, ${teal});
    cursor : pointer;
`


const ResetPassword = () => {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [response, setResponse] = useState(null);

    const onClickGoToLoginPage = () =>
    {
        history.push('/login');
    }

    const SendResetRequest = async () =>
    {
        try
        {
            const res = await axios.post('https://news-app-api-22.herokuapp.com/auth/resetpassword',
            {
                'username' : username,
                'newpassword' : newPassword
            });

            setResponse(res.data.msg);

        }catch(err)
        {
            console.log(err);
        }
    }

    return (
        <PageContainer>
            <MenuContainer>
                <Title>Reset Password</Title>
                <Description>Forgot your password? Reset it here.</Description>
                <FormContainer>
                    <TextInput 
                    type='text' 
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}></TextInput>
                    
                    <TextInput 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='New Password'
                    onChange={(e) => setNewPassword(e.target.value)}></TextInput>

                    {showPassword ?
                    <BsEye className='toogle-show-password' size={25} onClick={() => setShowPassword(false)}></BsEye> :
                    <BsEyeSlash className='toogle-show-password' size={25} onClick={() => setShowPassword(true)}></BsEyeSlash>
                    }
                    <ResetButton 
                    whileTap={{scale : 0.95}}
                    onClick={SendResetRequest}>Reset</ResetButton>
                    
                    <GoToLoginButton 
                    whileTap={{scale : 0.95}}
                    onClick={onClickGoToLoginPage}>Go to Login</GoToLoginButton>
                </FormContainer>
                    
                    {response === "Reset successful" ?
                    <SuccessMessage>Reset Successful</SuccessMessage> : <></>}

                    {response === "User doesn't exist" ?
                    <ErrorMessage>User doesn't Exist!</ErrorMessage> : <></>}


            </MenuContainer>
        </PageContainer>
    )
}

export default ResetPassword
