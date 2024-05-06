import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Buy } from './components/Buy.js';
import { Sell } from './components/Sell.js';
import { Welcome } from './components/Welcome.js';

function App() {
  return (
    <Router basename = "/DAppStore">
      <Routes>
        <Route path = "/" element={<Welcome />} />
        <Route path = "/buyproduct" element={<Buy />} />
        <Route path = "/sellproduct" element={<Sell />} />
        {/* <Route path = "/connectwallet" element={<Connect />} /> */}
      </Routes>
    </Router>
  );
}

export default App;