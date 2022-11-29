import React from 'react'
import axios from 'axios'
import { useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ArticlesGrid from '../components/News/ArticlesGrid';
import SideMenu from '../components/Home/SideMenu';

import ValidateLocalToken from '../functions/ValidateLocalToken'
import ValidateSessionToken from '../functions/ValidateSessionToken'
import Searchbar from '../components/Home/Searchbar';
import FilterSearchBar from '../components/Home/FilterSearchBar';
import Topics from '../components/Home/Topics';

const red = '#D4145A';
const orange = '#FBB03B';

const PageContainer = styled.div`
    width : 100vw;
    min-height : 100vh;
    height : 100vh;
    display : flex;
    overflow : hidden;
    background : linear-gradient(to right, ${orange}, ${red});
`

const MainMenu = styled.div`
    width : 100%;
    max-width : 100%;
    height : auto;

    display : flex;
    flex-direction : column;
`

const ContentContainer = styled.div`
    width : auto;
    height : fit-content;


    margin : 10px;
    
    display : flex;
    justify-content : center;

    overflow-y : scroll;
    overflow-x : hidden;
    border-radius : 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background : white;
`

const Home = () => {
    
    let history = useHistory();

    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTopic, setActiveTopic] = useState('');
    const [currentTab, setCurrentTab] = useState('top-headlines');
    const [isSearchTabActive, setIsSearchTabActive] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        'sortBy' : 'publishedAt',
        'language' : '',
        'search_type' : 'title-search',
        'from' : new Date().setMonth(new Date().getMonth - 1),
        'to' : new Date()
    })

    const AuthenticateUser = async () =>
    {
        const res = await ValidateLocalToken();
        const sessionRes = await ValidateSessionToken();

        if(res === false && sessionRes === false)
        {   
            history.push('/login');
    
        }
    }

    const FetchData = async() =>
    {
        try
        {
            let res;
            if(currentTab === 'top-headlines')
            {
                res = await axios.get('https://news-app-api-22.herokuapp.com/news/topheadlines?country=in',
                {headers : { 
                    'Access-Control-Allow-Origin' : '*', 
                    'Content-Type' : 'application/json',
                    'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}})
            }
            
            else if(currentTab === 'bookmarked')
            {
                res = await axios.get('https://news-app-api-22.herokuapp.com/news/bookmarked',
                {headers : { 
                    'Access-Control-Allow-Origin' : '*', 
                    'Content-Type' : 'application/json',
                    'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}})
            }
            
            else
            res = await axios.get(`https://news-app-api-22.herokuapp.com/news/topheadlines?category=${currentTab}`,
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}})
            setData(res.data.articles);
        }catch(err)
        {
            console.log(err)
        }
    }

    const FetchSearchData = async () =>
    {
        try
        {
            const urlEncQuery = encodeURIComponent(searchQuery);
            const res = await axios.get(`https://news-app-api-22.herokuapp.com/news/search?urlEncQuery=${urlEncQuery}&search_type=${searchFilters.search_type}&language=${searchFilters.language}&sortBy=${searchFilters.sortBy}&from=${searchFilters.from}&to=${searchFilters.to}`,
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}});
            setCurrentTab('search');
            setIsSearchTabActive(true);
            setData(res.data.articles);
        }catch(err)
        {
            console.log(err)
        }
    }

    const FetchArticles = async () =>
    {
        try
        {
            let res;
            if(activeTopic == undefined)
            {
                res = null;
            }
            else
            {
                const urlEncQuery = encodeURIComponent(activeTopic);
            res = await axios.get(`https://news-app-api-22.herokuapp.com/news/latest?urlEncQuery=${urlEncQuery}`,
            {headers : { 
                'Access-Control-Allow-Origin' : '*', 
                'Content-Type' : 'application/json',
                'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}});
            
            setData(res.data.articles);
            }
            
        }catch(err)
        {
            console.log(err);
        }
    }

    const onTabChange = (newtab) =>
    {
        setCurrentTab(newtab);
        if(newtab != 'search')
        setIsSearchTabActive(false);
        setData(null);
        console.log(newtab);
    }

    const onActiveTopicChange = (newActiveTopic) =>
    {
        if(currentTab == 'topics')
        {
            setActiveTopic(newActiveTopic);
            console.log(newActiveTopic);
        }
    }


    const onSearchFiltersChange = (newFilters) =>
    {
        setSearchFilters(newFilters);
    }

    const closeSearchTab = () =>
    {
        setIsSearchTabActive(false);
    }

    const onSearchQueryChange = (newQuery) =>
    {
        setSearchQuery(newQuery);
    }

    useEffect(() =>
    {
        if(currentTab != 'search')
        FetchData();
    }, [currentTab])

    useEffect(() => 
    {
        if(currentTab == 'topics')
        FetchArticles();
    }, [activeTopic])

    useEffect(() =>
    {
        AuthenticateUser();
    }, []);

    
    return (
        <PageContainer>
            <SideMenu onTabChange={onTabChange} isSearchTabActive={isSearchTabActive} closeSearchTab={closeSearchTab}></SideMenu>
            <MainMenu>
                <Searchbar onSearchQueryChange={onSearchQueryChange} onSearch={FetchSearchData}/>
                {isSearchTabActive ? <FilterSearchBar onSearchFiltersChange={onSearchFiltersChange}/> : <></>}
                {currentTab == 'topics' ? <Topics onActiveTopicChange={onActiveTopicChange}/> : <></>}
                <ContentContainer>
                    {data ? <ArticlesGrid articles={data} newsPerColumn={50} numOfColumns={3}></ArticlesGrid>
                    : <h3>Loading</h3>}
                    
                </ContentContainer>
            </MainMenu>
        </PageContainer>
    )
    //else return (<h3>Loading</h3>)
}

export default Home
