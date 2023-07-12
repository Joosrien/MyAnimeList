import { useContext, useEffect} from 'react';
import React from 'react';
import { AnimeContext } from '../context';
import AnimeInfo from './AnimeInfo';
const Mainpage = () => {
  const {setShowAnimeInfo, animeData, setAnimeData, searchTerm, setSearchTerm, handleSearch, trendandPop, setTrendandPop, setSearchPageOn, setNotFoundPage} = useContext(AnimeContext);
  const homeButton = () => {
        setSearchPageOn(true);
        setTrendandPop(true);
        setShowAnimeInfo(false);
        setNotFoundPage(false);
  }
  return(
    <>
    <header className='flex justify-center space-x-10 py-4 bg-black'>
            <button onClick={homeButton} className='text-white text-xl'>Home</button>
            <input className='p-2 border-black border-2 rounded-lg' type="text" placeholder="Search Anime Here" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            <button className="text-xl border-2 border-black px-4 rounded-lg text-white" onClick={handleSearch}>Search</button>
    </header>
        <AnimeInfo/>
    </>
  )
};

export default Mainpage;