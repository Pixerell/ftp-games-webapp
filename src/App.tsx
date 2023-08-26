import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import MainPage from "./views/main-page/MainPage";
import GamePage from "./views/game-page/GamePage";

function App() {
  return (
    <div className="mainBg">
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/game/:id" element={<GamePage/>}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
