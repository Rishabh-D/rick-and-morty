import React, { useState } from 'react';
import { useQuery } from "react-query"
import Character from './Character';

const Characters = () => {

  const [page, setPage] = useState(1)
  const fetchCharacters = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    return await response.json()
  }

  const {data, status, isPreviousData, isLoading, isError} = useQuery(["characters",page], fetchCharacters, {keepPreviousData:true})
  
  if (isLoading){
    return <div>Loading...</div>
  }
  else if(isError){
    return <div>Error</div>
  }

  console.log(page)
  
  
  return (
    <div className='container'>
      <h1>Rick and Morty</h1>
      <div className='characters'>
        {data.results.map(character => <Character key={character.id} character={character}></Character>)}
      </div>
      <div className='Pagination-btn'>
        <button disabled = {page===1} onClick={() => setPage(page=> page-1)}>Prev</button>
        <button disabled = {data.info.next === null && isPreviousData} onClick={() => setPage(page=> page+1)}>Next</button>
      </div>
    </div>
  );
};

export default Characters;