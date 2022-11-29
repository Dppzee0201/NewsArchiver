import React from 'react'
import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styled from 'styled-components'

const FilterSearchBarContainer = styled.div`
    width : auto;
    height : 5vh;
    min-height : 50px;

    margin : 10px;
    padding : 5px;
    display : flex;
    align-items : center;

    background-color : white;
    border-radius : 5px;
`

const FilterOption = styled.div`
  width : fit-content;
  height : 100%;

  margin : 0px auto;
  padding : 0px 5px;
  display : flex;
  align-items : center;
  justify-content : center;

  font-family : Bahnschrift;
  background-color : white;
  border-radius : 5px;

`

const FilterOptionText = styled.h3`
  font-size : 16px;
`
const FilterSearchBar = ({onSearchFiltersChange}) => {

    const [sortBy, setSortBy] = useState('publishedAt');
    const [language, setLanguage] = useState('');
    const [searchType, setSearchType] = useState('title-search');
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date())

    useEffect(() =>
    {
      console.log(dateFrom.toISOString());
    }, [dateFrom])

    useEffect(() => {
      const tempDate = dateFrom;
      tempDate.setMonth(tempDate.getMonth() - 1);
      setDateFrom(tempDate);
    }, []) //set oldest date to oldest search possible which is a month old

    useEffect(() =>
    {
        const newSearchFilters = {
          'sortBy' : sortBy,
          'language' : language,
          'search_type' : searchType,
          'from' : dateFrom,
          'to' : dateTo
        }

        onSearchFiltersChange(newSearchFilters);
    }, [sortBy, language, searchType, dateFrom, dateTo])

    return (
      <FilterSearchBarContainer className='filter-search'>
          <FilterOption>
              <FilterOptionText>Sort by: </FilterOptionText>
                  <select onChange={(e) => setSortBy(e.target.value)}>
                      <option value='publishedAt' selected>Published At</option>
                      <option value='relevancy'>Relevancy</option>
                      <option value='popularity'>Popularity</option>
                  </select>
          </FilterOption>

          <FilterOption>
              <FilterOptionText>Language: </FilterOptionText>
                  <select onChange={(e) => setLanguage(e.target.value)}>
                      <option value='' selected>All</option>
                      <option value='ar'>عربي (Arabic)</option>
                      <option value='de'>Deutsch (German)</option>
                      <option value='en'>English</option>
                      <option value='es'>español (Spanish)</option>
                      <option value='fr'>français (French)</option>
                      <option value='he'>עִברִית (Hebrew)</option>
                      <option value='it'>italiano (Italian)</option>
                      <option value='nl'>Nederlands (Dutch)</option>
                      <option value='no'>norsk (Norwegian)</option>
                      <option value='pt'>português (Portuguese)</option>
                      <option value='ru'>русский (Russian)</option>
                      <option value='se'>svenska (Swedish)</option>
                      <option value='zh'>中国人 (Chinese)</option>
                  </select>
          </FilterOption>

          <FilterOption>
              <FilterOptionText>Search Type:</FilterOptionText>
              <select onChange={(e) => setSearchType(e.target.value)}>
                      <option value='general-search'>General Search</option>
                      <option value='title-search' selected>Title Search</option>
                  </select>
          </FilterOption>

          <FilterOption>
              <FilterOptionText>From:</FilterOptionText>
              <ReactDatePicker className='date-picker' selected={dateFrom} onChange={(newDate) => {
                const oldestPossibleDate = new Date();
                oldestPossibleDate.setMonth(oldestPossibleDate.getMonth() - 1);
                if(newDate >= oldestPossibleDate)
                setDateFrom(newDate)
                else
                {
                  //do nothing
                }
              }}></ReactDatePicker>
          </FilterOption>

          <FilterOption>
              <FilterOptionText>To:</FilterOptionText>
              <ReactDatePicker className='date-picker' selected={dateTo} onChange={(newDate) => {
                if(newDate <= new Date())
                setDateTo(newDate)
                else
                {
                  //do nothing
                }
                }}></ReactDatePicker>
          </FilterOption>
       </FilterSearchBarContainer>  
    )
}

export default FilterSearchBar
