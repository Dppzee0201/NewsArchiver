import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import NewsCard from './NewsCard'

const ArticlesContainer = styled.div`
    display : flex;
    justify-content : center;
    align-items : start;
    flex-wrap : wrap;
`

const ArticlesColumn = styled.div`

    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`
const ArticlesGrid = ({articles, numOfColumns, newsPerColumn}) => {
    
    const [columns, setColumns] = useState([]);
    const [updateState, setUpdateState] = useState(0);
    
    const SetGrid = () =>
    {
        setColumns([]);
        const columnsTemp = [];
        for(var i=0; i<numOfColumns; i++)
        {
            columnsTemp.push([]);
        }

        var index = 0;
        for(var i=0; i< newsPerColumn; i++)
        {
            for(var j=0; j<numOfColumns; j++)
            {
                columnsTemp[j].push(
                    <NewsCard articleData={articles[index]} key={'key' + i + j}></NewsCard>
                )
                index++;
                if(index >= articles.length)
                break;
            }
            if(index >= articles.length)
                break;
        }

        setColumns(columnsTemp);
       
    }

   useEffect(() =>
   {
        SetGrid();
        setUpdateState(updateState + 1);
   }, [articles, numOfColumns, newsPerColumn])

   if(articles.length > 0)
    return (
        <ArticlesContainer>
          {columns ? columns.map((column, article) => 
          <ArticlesColumn>
              {column}
          </ArticlesColumn>) : <></>}
          
        </ArticlesContainer>
        
    )
    else return (<h3>Empty</h3>)
}

export default ArticlesGrid
