import React from 'react';
import { useQuery } from "react-query"
import Character from './Character';
const Characters = () => {
  const fetchCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    return await response.json()
  }

  const {data, status} = useQuery("characters", fetchCharacters)
  
  if (status === "loading"){
    return <div>Loading...</div>
  }
  else if(status === "error"){
    return <div>Error</div>
  }


  
  
  return (
    <div>
      {data.results.map(character => <Character key={character.id} character={character}></Character>)}
    </div>
  );
};

export default Characters;