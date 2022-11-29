import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoMdAdd, IoIosClose } from 'react-icons/io'
import { act } from 'react-dom/test-utils'
import axios from 'axios'

const TopicsContainer = styled.div`
    width : auto;
    height : auto;
    
    margin : 10px;
    padding : 5px;
    background-color : white;
    border-radius : 5px;
`

const AddNewTopicContainer = styled.div`
    width : auto;
    height : auto;

    display : flex;
    background : #c9c9c9;
    align-items : center;
`

const AddNewTopicInput = styled.input`
    width : 100%;
    height : 30px;

    padding: 5px 10px;

    outline : none;
    border : none;
    border-radius : 5px;
    font-size : 20px;
    font-family : Bahnschrift;
    background : #c9c9c9;
`

const AddedTopics = styled.div`
    width : 100%;
    height : fit-content;

    display : flex;
    justify-content : center;
    align-items : center;
    flex-wrap : wrap;
`


const TopicInactive = styled.div`
    width : fit-content;
    height : auto;

    margin : 10px;
    padding : 5px 10px;
    
    display : flex;
    justify-content : center;
    align-items : center;
    white-space : nowrap;
    

    font-family : Bahnschrift;
    font-size : 20px;    
    border : 1px solid black;
    border-radius : 5px;
    cursor : pointer;
`

const TopicActive = styled.div`
    width : fit-content;
    height : auto;

    margin : 10px;
    padding : 5px 10px;
    
    display : flex;
    justify-content : center;
    align-items : center;
    white-space : nowrap;
    

    font-family : Bahnschrift;
    font-size : 20px;    
    border-radius : 5px;
    background : black;
    color : white;
    cursor : pointer;
`

const TopicActiveContainer = styled.div`
    width : fit-content;
    height : auto;

    margin : 10px;
    padding : 5px 10px;

    display : flex;
    justify-content : center;
    align-items : center;

    border-radius : 5px;
    background : black;
    color : white;
`

const TopicInactiveContainer = styled.div`
    width : fit-content;
    height : auto;

    margin : 10px;
    padding : 5px 10px;

    display : flex;
    justify-content : center;
    align-items : center;

    border-radius : 5px;
    border : 1px solid black;
    background : white;
    color : black;
`

const TopicText = styled.div`
    font-size : 20px;
    font-family : Bahnschrift;

    cursor : pointer;

`


const Topics = ({onActiveTopicChange}) => {

    const [newTopic, setNewTopic] = useState('');
    const [updateState, setUpdateState] = useState(0);
    const [activeTopic, setActiveTopic] = useState();
    const [topics, setTopics] = useState([]);
    const [topicsJSX, setTopicsJSX] = useState([]);
    
    const DeleteTopic = async (topic) =>
    {
        try
        {
            const res = await axios.delete(`https://news-app-api-22.herokuapp.com/news/topics?topicToDelete=${topic}`,
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}
            });
            
            if(res.data.msg == 'deleted')
            {
                let temp = topics;
                //temp topic is individual topic inside the array, i use temptopic variable name because topic is already used
                temp = temp.filter((tempTopic) => tempTopic != topic);
                setTopics(temp);
                setUpdateState(updateState + 1);
            }
        }catch(err)
        {
            console.log(err);
        }
    }
    const AddNewTopic = async () =>
    {
        try
        {
            const res = await axios.post('https://news-app-api-22.herokuapp.com/news/topics',
            {
                'newTopic' : newTopic
            },
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}
            });

            console.log(res.data);
            if(res.data.msg == 'topic added')
            {
                const temp = topics;
                temp.push(newTopic);
                setTopics(temp);
                setUpdateState(updateState + 1);
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    const FetchTopicsData = async () =>
    {
        try
        {
            const res = await axios.get('https://news-app-api-22.herokuapp.com/news/topics',
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + ((localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) || sessionStorage.getItem("accessToken"))}
            });

            console.log(res.data);

            if(res.data.topics != undefined)
            {
                setTopics(res.data.topics);
                setUpdateState(updateState + 1);
            }
        }catch(err)
        {
            console.log(err);
        }
        
        SetTopicsState();
    }


    const SetTopicsState = () =>
    {
        const temp = [];
        topics.forEach((topic) =>
        {
            if(topic == activeTopic)
            temp.push(<TopicActiveContainer
                        className='topic-button' 
                        onClick={() => setActiveTopic(topic)}
                        key={topic}><TopicText>{topic}</TopicText>
                        <IoIosClose 
                        className='delete-topic-icon' 
                        onClick={() => DeleteTopic(topic)}/>
                        </TopicActiveContainer>)
            else
            temp.push(<TopicInactiveContainer 
                        className='topic-button' 
                        onClick={() => setActiveTopic(topic)}
                        key={topic}><TopicText>{topic}</TopicText>
                        <IoIosClose 
                        className='delete-topic-icon' 
                        onClick={() => DeleteTopic(topic)}/>
                        </TopicInactiveContainer>)
        });
        setTopicsJSX(temp);
    }

    useEffect(() =>
    {
        SetTopicsState();
        onActiveTopicChange(activeTopic); 
    }, [activeTopic])

    useEffect(() =>
    {
        SetTopicsState();
    }, [updateState])

    useEffect(() =>{
        FetchTopicsData();
    }, []);

    if(topics != undefined && topics != null)
    return (
       <TopicsContainer>
           <AddNewTopicContainer>
               <IoMdAdd className='add-icon' onClick={AddNewTopic}/>
               <AddNewTopicInput 
               onChange={(e) => setNewTopic(e.target.value)}
               placeholder='Add a new topic to access it quickly'/>
           </AddNewTopicContainer>

        <AddedTopics>
            {topicsJSX}
        </AddedTopics>
       </TopicsContainer>
    )
    else return (<></>)
}

export default Topics
