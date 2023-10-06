import logo from './logo.svg';
import './App.css';
import FixedContainer from './component/container';
import MapContainer from './component/map';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FixedContainer />} />
        <Route path="/map" element={<MapContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
