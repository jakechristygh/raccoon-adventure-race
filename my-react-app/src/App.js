import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Register from './pages/Register';
import Results from './pages/Results';
import RaceInfo from './pages/RaceInfo';
import UpdateResults from "./pages/admin/UpdateResults";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/results" element={<Results />} />
        <Route path="/race-info" element={<RaceInfo />} />
        <Route path="/admin/results" element={<UpdateResults />} />
      </Routes>
    </Router>
  );
}

export default App;
