import React, { useState, useEffect } from "react";
import axios from "axios";
import EpisodeList from "./EpisodeList";

function AnimeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeResults, setAnimeResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShow, setSelectedShow] = useState<any | null>(null);

  const handleSearch = () => {
    setIsLoading(true);

    axios
      .get(`https://api.betaseries.com/search/shows?key=4828f680f398&svods=221&text=${searchTerm}&limit=10`)
      .then((res) => {
        setAnimeResults(res.data.shows);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleShowClick = (item: any) => {
    console.log("Clicked on show:", item.title);
    axios
      .get(`https://api.betaseries.com/shows/display?key=4828f680f398&id=${item.id}`)
      .then((res) => {
        const selectedShowData = res.data.shows;
        setSelectedShow(selectedShowData);
      })
      .catch((error) => {
        console.error("Error fetching show data:", error);
      });
  };
  
  

  return (
    <div>
      <h1>Anime Search</h1>
      <input
        type="text"
        placeholder="Cherche ton anime"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}

      <div className="anime-results">
        {animeResults.map((anime, index) => (
          <div key={index} onClick={() => handleShowClick(anime)}>
            <h3>{anime.title}</h3>
            <p>{anime.description}</p>
            <img src={anime.poster} alt={anime.title} />
          </div>
        ))}
      </div>
      {selectedShow && (
        <EpisodeList selectedShow={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}

export default AnimeSearch;
