import React, { useState, useEffect } from "react";
import axios from "axios";

function EpisodeList({ selectedShow, onClose }: { selectedShow: { thetvdb_id: string; original_title: string } | null; onClose: () => void }) {
  const [episodes, setEpisodes] = useState<Array<{
    thetvdb_id: string;
    episode: number;
    title: string;
    date: string;
  }>>([]);
  const [showInfo, setShowInfo] = useState<any>(null);

  function adding() {
    let jeton = localStorage.getItem("token");
    console.log(showInfo.thetvdb_id);
    console.log(jeton);
    console.log(
      `https://api.betaseries.com/shows/show?key=${process.env.REACT_APP_API_KEY}&thetvdb_id=${showInfo.thetvdb_id}&token=${jeton}`
    );
    axios
      .post(
        `https://api.betaseries.com/shows/show?key=${process.env.REACT_APP_API_KEY}&thetvdb_id=${showInfo.thetvdb_id}&token=${jeton}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function seen(thetvdb_id: string) {
    let bulk = true;
    let jeton = localStorage.getItem("token");
    console.log(episodes);
    axios
      .post(
        `https://api.betaseries.com/episodes/watched?key=${process.env.REACT_APP_API_KEY}&thetvdb_id=${thetvdb_id}&token=${jeton}&bulk=${bulk}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (selectedShow) {
      axios
        .get(
          `https://api.betaseries.com/shows/episodes?key=${process.env.REACT_APP_API_KEY}8&thetvdb_id=${selectedShow.thetvdb_id}`
        )
        .then((res) => {
          setEpisodes(res.data.episodes);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`https://api.betaseries.com/shows/display?key=${process.env.REACT_APP_API_KEY}&thetvdb_id=${selectedShow.thetvdb_id}`)
        .then((res) => {
          setShowInfo(res.data.show);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedShow]);

  return (
    <div>
      <button onClick={() => onClose()}>Retour</button>
      {showInfo ? (
        <div>
          <button
            onClick={adding}
            className="bg-blue-300 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-lg"
          >
            Ajouter la série a votre liste
          </button>
          <br />
          <strong>Titre:</strong>
          <h1>{showInfo.title}</h1>
          <br />
          <p>Description {showInfo.description}</p>
          <br />
          <p>Nombre de saisons: {showInfo.seasons}</p>
          <br />
          <p>Nombre d'episodes: {showInfo.episodes}</p>
          <br />
          <p>Durée moyenne d'un episode: {showInfo.length} minutes</p>
          {showInfo.images.poster && (
            <img src={showInfo.images.poster} alt={`Poster for ${showInfo.title}`} />
          )}
        </div>
      ) : null}
      <div>
        <h2>Episodes</h2>
        <br />
        <ul>
          {episodes.map((episode, index) => (
            <li key={index}>
              Episode {episode.episode} - {episode.title} - {episode.date}
              <button
                onClick={() => seen(episode.thetvdb_id)}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Episode vu
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EpisodeList;
