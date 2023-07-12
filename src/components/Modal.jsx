import { useContext, useState, useEffect } from 'react';
import React from 'react';
import { AnimeContext } from '../context';
import TrendingPage from './TrendingPage';
import AnimeInfo from './AnimeInfo';
import Popular from './Popular';
const Modal = () => {
  const {showModal, setShowModal, handleSearch, animeId, setAnimeId} = useContext(AnimeContext);
    const [modalAnime, setModalAnime] = useState(null);
    const removeLineBreaksAndItalicTags = (description) => {
        if (!description) {
          return "";
        }
        return description.replace(/<\/?br>/gi, ' ').replace(/<\/?i>/gi, '').replace(/<\/?b>/gi, '');
      };
  const fetchAnimeData = async () => {
    var query = `
      query ($id: Int) {
        Media (id: $id, type: ANIME) {
          id
          averageScore
          description
          status
          seasonYear
          genres
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          episodes
        }
      }
    `;

    var variables = {
      id: animeId,
    };

    var url = 'https://graphql.anilist.co';
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.data.Media);
      setModalAnime(data.data.Media);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (animeId) {
      fetchAnimeData();
    }
  }, [animeId]);
  const setShowModalHandler = () => {
    setShowModal(false);
  }
  return (
     <>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='absolute w-full h-full bg-slate-400 bg-opacity-40 border'></div>
          {modalAnime && (
            <div className='relative w-4/5 overflow-scroll bg-white p-4 flex'>
              <img className='' src={modalAnime.coverImage.large} alt='' />
              <aside className='pl-4'>
              <h1 className='text-xl font-bold'>{modalAnime.title.english ? modalAnime.title.english : modalAnime.title.native}</h1>
                <p>{removeLineBreaksAndItalicTags(modalAnime.description)}</p>
                <p>Average Score: {modalAnime.averageScore ? modalAnime.averageScore : "TBD"}</p>
                <p>Status: {modalAnime.status == "NOT_YET_RELEASED" ? "RELEASES" : modalAnime.status} {modalAnime.seasonYear}</p>
                <p>Episodes: {modalAnime.episodes}</p>
                <ul className='flex space-x-2'>
                    {modalAnime.genres.map((genre) => (
                    <li key={genre} className='bg-blue-300 p-1 rounded-lg px-2'>{genre}</li>
                    ))}
                </ul>
              </aside>
              <button className='h-1/2 rounded-lg p-1 bg-red-50' onClick={setShowModalHandler}>Close</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Modal;