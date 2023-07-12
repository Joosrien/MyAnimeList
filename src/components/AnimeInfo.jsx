import { useContext, useEffect } from 'react';
import React from 'react';
import NotFound from './NotFound';
import { AnimeContext } from '../context';

const AnimeInfo = () => {
  const { showAnimeInfo, setShowAnimeInfo, searchTerm, animeData, setSearchPageOn, setTrendandPop, notFoundPage, setNotFoundPage } = useContext(AnimeContext);

  const removeLineBreaksAndItalicTags = (description) => {
    if (!description) {
      return '';
    }
    return description.replace(/<\/?br>/gi, ' ').replace(/<\/?i>/gi, '').replace(/<\/?b>/gi, '');
  };

  useEffect(() => {
    if (animeData && animeData.length === 0) {
      setSearchPageOn(false);
      setTrendandPop(false);
      setNotFoundPage(true);
    } else {
      setShowAnimeInfo(true);
    }
  }, [animeData, setSearchPageOn]);

  const notFoundPageHandler = () => {
    setNotFoundPage();
  }
  return (
    <>
        {animeData && showAnimeInfo && (
          <section className='flex flex-col pl-4'>
            {animeData.map((item) => (
              <div className='flex py-2 border-black border-2 m-2 rounded-lg bg-white' key={item.id}>
                <img className='' src={item.coverImage.large} alt='' />
                <aside className='pl-4'>
                  <h1 className='text-xl font-bold'>{item.title.english ? item.title.english : item.title.native}</h1>
                  <p>{removeLineBreaksAndItalicTags(item.description)}</p>
                  <p>Average Score: {item.averageScore ? item.averageScore : 'TBD'}</p>
                  <p>Status: {item.status === 'NOT_YET_RELEASED' ? 'RELEASES' : item.status} {item.seasonYear}</p>
                  <p>Episodes: {item.episodes}</p>
                  <ul className='flex space-x-2'>
                    {item.genres.map((genre) => (
                      <li key={genre} className='bg-blue-300 p-1 rounded-lg px-2'>{genre}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            ))}
          </section>
        )}
        {/* {animeData == null || searchTerm.length == 0 ? setNotFoundPage(true) : setNotFoundPage(false)} */}
        {notFoundPage && <NotFound/>}
    </>
  );
};

export default AnimeInfo;
