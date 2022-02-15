import './App.css';
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
