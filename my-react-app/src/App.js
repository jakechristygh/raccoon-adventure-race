import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Results from './pages/Results';
import RaceInfo from './pages/RaceInfo';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/results" element={<Results />} />
        <Route path="/race-info" element={<RaceInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
