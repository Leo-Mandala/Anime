import React, { useState, useEffect } from "react";
import axios from "axios";

function ListOfShows() {
  const [memberShows, setMemberShows] = useState<{ title: string; images: { poster: string } }[] | null>(null);

  useEffect(() => {
    let jeton = localStorage.getItem("token");
    axios
      .get(
        `https://api.betaseries.com/shows/member?key=${process.env.REACT_APP_API_KEY}&token=${jeton}`
      )
      .then((res) => {
        setMemberShows(res.data.shows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (localStorage.getItem("token") === null) {
    window.location.href = "/login";
  }

  return (
    <div>
      {memberShows ? (
        <div>
          <h2 className="text-3xl font-bold mb-10">
            Series ajoutées par l'utilisateur
          </h2>
          <div className="flex flex-wrap justify-center">
            <ul>
              {memberShows.map((show, index) => (
                <li key={index} className="bg-gray-200 shadow-lg p-10 m-5 rounded-lg">
                  {show.title}
                  <img
                    src={show.images.poster}
                    alt={show.title}
                    className="w-96"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ListOfShows;
