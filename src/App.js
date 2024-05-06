import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Buy } from './components/Buy';
import { Sell } from './components/Sell';
import { Welcome } from './components/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Welcome />} />
        <Route path = "/buyitems" element={<Buy />} />
        <Route path = "/sellitems" element={<Sell />} />
        {/* <Route path = "/connectwallet" element={<Connect />} /> */}
      </Routes>
    </Router>
  );
}

export default App;