import React, { useEffect, useState } from "react";
import { AnimeContext } from "./context";
import Mainpage from "./components/Mainpage";
import TrendingPage from "./components/TrendingPage";
import Modal from "./components/Modal";
import Popular from "./components/Popular";
import './App.css';

const HomePage = () => {
  const [searchPageOn, setSearchPageOn] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [animeData, setAnimeData] = useState(null);
  const [animeId, setAnimeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [trendandPop, setTrendandPop] = useState(true);
  const [showAnimeInfo, setShowAnimeInfo] = useState(false);
  const [notFoundPage, setNotFoundPage] = useState(false);

  const fetchAnimeData = async () => {
    const query = `
      query ($search: String, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(search: $search, type: ANIME) {
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
      }
    `;

    const variables = {
      search: searchTerm,
      page: 1, // Specify the page number you want to retrieve
      perPage: 100, // Specify the number of items per page
    };

    const url = "https://graphql.anilist.co";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.data.Page.media); // Handle the data as per your requirements
      setAnimeData(data.data.Page.media);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchAnimeData();
    setTrendandPop(false);
  };

  return (
    <AnimeContext.Provider
      value={{
        notFoundPage,
        setNotFoundPage,
        showAnimeInfo,
        setShowAnimeInfo,
        trendandPop,
        setTrendandPop,
        showModal,
        setShowModal,
        animeId,
        setAnimeId,
        searchPageOn,
        setSearchPageOn,
        searchTerm,
        setSearchTerm,
        setAnimeData,
        handleSearch,
        animeData,
      }}
    >
      <Mainpage />
      {showModal && (<Modal/>)}
      {trendandPop && (<TrendingPage/>)}
      {trendandPop && (<Popular/>)}
    </AnimeContext.Provider>
  );
};

export default HomePage;
