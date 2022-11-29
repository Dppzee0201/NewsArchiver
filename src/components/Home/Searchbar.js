import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'


const UtilitybarContainer = styled.div`
    width : auto;
    min-height : 30px;
    height : 5vh;

    margin : 10px;
    padding : 5px;
    display : flex;
    align-items : center;

    background-color : white;
    border-radius : 5px;
`

const SearchbarContainer = styled.div`
    width : 100%;
    height : 100%;

    display : flex;
    align-items : center;
    background-color : #c9c9c9;
    border-radius : 5px;
`
const SearchInput = styled.input`
    height : 75%;
    width : 100%;

    font-size : 20px;
    font-family : Bahnschrift;
    outline : none;
    border : none;
    background-color : #c9c9c9;

`


const Searchbar = ({onSearchQueryChange, onSearch}) => {

    const [searchQuery, setSearchQuery] = useState('');

    const onSearchClick = async () =>
    {
        onSearch();
    }

    useEffect(() =>
    {
        onSearchQueryChange(searchQuery);
    }, [searchQuery]);

    return (
        <UtilitybarContainer>
            <SearchbarContainer>
                <AiOutlineSearch className='search-icon' onClick={onSearchClick}></AiOutlineSearch>
                <SearchInput 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search about a topic'></SearchInput>
            </SearchbarContainer>
        </UtilitybarContainer>
    )
}

export default Searchbar
