import React, { useState, useEffect, useContext } from "react";
import { AnimeContext } from "../context";

const TrendingPage = () => {
    const {searchPageOn, animeId, setAnimeId, showModal, setShowModal} = useContext(AnimeContext);
    const [trendingAnime, setTrendingAnime] = useState([]);
  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    const query = `
      query {
        Page {
          media(sort: TRENDING_DESC, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
                large
                medium
            }
            averageScore
            popularity
          }
        }
      }
    `;

    const url = "https://graphql.anilist.co";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.data.Page.media); // Handle the data as per your requirements
      setTrendingAnime(data.data.Page.media);
    } catch (error) {
      console.error(error);
    }
  };
  
  const setAnimeIdHandler = (idNum) => {
    setAnimeId(idNum);
    console.log(animeId);
  }
  const setShowModalHandler = () => {
    setShowModal(true);
  }

  return (
    <>
        {searchPageOn && (
            <div className="container mx-auto">
            <h1 className="text-xl font-bold text-white">Trending Anime</h1>
            <div className="overflow-x-auto whitespace-nowrap bg-white">
                {trendingAnime.map((anime)=>{
                    return(
                        <div key={anime.id} className="inline-block px-2">
                            <div className="w-48 h-64">
                                <img onClick={()=>{setAnimeIdHandler(anime.id); setShowModalHandler();}} className="w-full h-full object-cover hover:border-black border-2" src={anime.coverImage.large} alt="" />
                            </div>
                        {/* <h1>{anime.title.english}</h1> */}
                        </div>
                    )
                })}
            </div>
            </div>
        )
        }
    </>
  );
};

export default TrendingPage;
