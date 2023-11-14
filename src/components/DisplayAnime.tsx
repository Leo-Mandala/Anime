import React, { useState, useEffect } from "react";
import axios from "axios";
import EpisodeList from "./EpisodeList";
import defaultImage from "./noimage.jpg";

function DisplayAnime() {
  const [animes, setAnimes] = useState<Array<any> | null>(null);
  const [selectedShow, setSelectedShow] = useState<{ thetvdb_id: string; original_title: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 10;

  useEffect(() => {
    axios
      .get(`https://api.betaseries.com/shows/list?key=4828f680f398&platforms=221`)
      .then((res) => {
        setAnimes(res.data.shows);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShowClick = (item: { thetvdb_id: string; original_title: string }) => {
    console.log("Clicked on show:", item.original_title);
    setSelectedShow(item);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = defaultImage;
  };

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = animes?.slice(indexOfFirstShow, indexOfLastShow);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Liste d'animes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!selectedShow ? (
          currentShows ? (
            currentShows.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-4 cursor-pointer transition duration-300 hover:shadow-lg"
                onClick={() => handleShowClick(item)}
              >
                <p className="text-lg font-semibold">{item.original_title}</p>
                <img
                  src={item.images.poster ? item.images.poster : defaultImage}
                  alt={item.original_title}
                  onError={handleImageError}
                  className="mt-2 object-cover h-64 w-1/2"
                />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <EpisodeList selectedShow={selectedShow} onClose={() => setSelectedShow(null)} />
        )}
      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex justify-center">
        {animes && animes.length > showsPerPage && (
          <ul className="flex space-x-2">
            {Array.from({ length: Math.ceil(animes.length / showsPerPage) }, (_, index) => (
              <li
                key={index}
                onClick={() => paginate(index + 1)}
                className={`cursor-pointer ${currentPage === index + 1 ? "text-blue-500 font-semibold" : ""}`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default DisplayAnime;
