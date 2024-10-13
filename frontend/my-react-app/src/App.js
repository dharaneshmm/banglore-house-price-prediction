import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import Prediction from "./components/Prediction"; // Default import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/prediction" element={<Prediction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
