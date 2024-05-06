import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Buy } from './Buy';
import { Sell } from './Sell';
import { Welcome } from './Welcome';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/buyproduct" element={<Buy />} />
                <Route path="/sellproduct" element={<Sell />} />
            </Routes>
        </Router>
    );
}

export default App;
