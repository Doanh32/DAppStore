import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Buy } from './components/Buy';
import { Sell } from './components/Sell';
import { Welcome } from './components/Welcome';

function app() {
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

export default app;
