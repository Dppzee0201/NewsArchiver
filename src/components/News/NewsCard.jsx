import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import '../../CSS/News.css'
import { BsBookmark, BsBookmarkCheck } from 'react-icons/bs'

const red = '#D4145A';
const orange = '#FBB03B';

const PageContainer = styled.div`
    width : 100vw;
    height : 100vh;

    display : flex;
    align-items : center;
    justify-content : center;
`

const CardContainer = styled.div`
    width : 400px;
    height : fit-content;
    margin : 20px;

    display : flex;
    flex-direction : column;
    border-radius : 5px;
    background : white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition : height 250ms ease;
`

const BannerImage = styled.img`
    width : 100%;
    border-radius : 5px 5px 0px 0px;
`

const Title = styled.h3`
    margin : 10px 10px;
    text-align : left;
    font-family : Bahnschrift;
    font-size : 22px;
`

const ExpandCollapse = styled.div`
    width : 100%;
    margin-bottom : 20px;
    display : flex;
    justify-content : center;
`

const Source = styled.h3`
    margin : 10px 10px;
    font-family : Bahnschrift;
    font-size : 20px;
`

const Description = styled.h3`
    margin : 5px 10px;
    text-align : left;
    font-family : Bahnschrift;
    font-size : 20px;
    font-stretch : condensed;
    font-weight : 100;
`

const ButtonContainer = styled.div`
    width : 100%;
    height : auto;
    margin : 0px;

    display : flex;
    justify-content : center;
`

const GoToArticleButton = styled(motion.button)`
    width : 80%;
    height : 40px;
    margin : 5px;
    
    color : white;
    font-family : Bahnschrift;
    font-size : 20px;
    outline : none;
    border : none;
    border-radius : 5px;
    background : ${red};
    cursor : pointer;

`

const BookmarkButton = styled(motion.div)`
    width : 40px;
    height : 40px;

    margin : 5px;
    display : flex;
    align-items : center;
    justify-content : center;
    outline : none;
    border : 1px solid ${red};
    border-radius : 5px;
    background : ${red};
    cursor : pointer;
`

const BookmarkedButton = styled(motion.div)`
    width : 40px;
    height : 40px;

    margin : 5px;
    display : flex;
    align-items : center;
    justify-content : center;
    outline : none;
    border : 1px solid ${red};
    border-radius : 5px;
    background : white;
    cursor : pointer;
`
const NewsCard = ({articleData}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const onClickGoToArticle = () =>
    {
        window.open(articleData.url);
    }

    const onClickBookmark = async () =>
    {
        try
        {
            const res = await axios.post('https://news-app-api-22.herokuapp.com/news/addbookmark',
            {
                articleToBookmark : articleData
            },
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + ((localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) || sessionStorage.getItem('accessToken'))}
            })

            console.log(res.data);
            if(res.status == 200)
            {
                console.log('success');
            }
            setIsBookmarked(!isBookmarked);
        }catch(err)
        {
            console.log(err);
        }
    }

    const CheckIfBookmarked = async () =>
    {
        try
        {
            const res = await axios.post('https://news-app-api-22.herokuapp.com/news/checkifbookmarked',
            {
                articleToCheck : articleData
            },
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + ((localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) || sessionStorage.getItem('accessToken'))}
            });

            console.log(res.data.isBookmarked);
            if(res.data.isBookmarked == true || res.data.isBookmarked == false)
            {
                setIsBookmarked(res.data.isBookmarked);
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    useState(() =>
    {
        CheckIfBookmarked();
    }, [])

    if(articleData)
    return (
        <CardContainer>
                <BannerImage src={articleData.urlToImage}></BannerImage>
                <Title>{articleData.title}</Title>
                
                <ExpandCollapse>
                    { isExpanded ? 
                    <MdExpandLess size={30} onClick={() => setIsExpanded(false)}></MdExpandLess>  
                    : <MdExpandMore size={30} onClick={() => setIsExpanded(true)}></MdExpandMore>}
                </ExpandCollapse>

            {isExpanded ? 
            <div>
                <Source>{'Source : ' + articleData.source.name}</Source>
                <Description>{articleData.description}</Description>
                <ButtonContainer>
                    <GoToArticleButton 
                        onClick={onClickGoToArticle}
                        whileTap={{scale : 0.95}}>
                            Go To Article</GoToArticleButton>
                    
                    {isBookmarked ?
                    <BookmarkedButton 
                    onClick={() => onClickBookmark()}
                    whileTap={{scale : 0.95}}>
                        <BsBookmarkCheck style={{color : red}} size={20}></BsBookmarkCheck>
                        </BookmarkedButton>
                    :   <BookmarkButton 
                    onClick={() => onClickBookmark()}
                    whileTap={{scale : 0.95}}>
                        <BsBookmark style={{color : 'white'}} size={20}></BsBookmark>
                        </BookmarkButton>}
                </ButtonContainer>
            </div>
             : <></>}

            
            </CardContainer>
    )
    else return (<></>)
}

export default NewsCard
