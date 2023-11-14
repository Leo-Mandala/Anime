import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import DisplayAnime from './components/DisplayAnime';
import AnimeSearch from './components/AnimeSearch';
import ListOfShows from './components/ListOfShows';
import { Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
    <Routes>
   <Route path="/" element={<Navbar />} />
   <Route path="/Display" element={<DisplayAnime />} />
   <Route path="/Search" element={<AnimeSearch />} />
   <Route path="/List" element={<ListOfShows />} />
   </Routes>
    </>
  );
}

export default App;
