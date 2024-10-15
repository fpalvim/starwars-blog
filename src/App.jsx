import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Characters from "./components/Characters.jsx";
import Vehicles from "./components/Vehicles.jsx";
import Planets from "./components/Planets.jsx";
import Home from "./components/Home.jsx";
import CharInfo from "./components/CharInfo.jsx";
import PlanetInfo from "./components/PlanetInfo.jsx";
import VehicleInfo from "./components/VehiclesInfo.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="characters/" element={<Characters />} />
        <Route path="charInfo/:uid" element={<CharInfo />} />
        <Route path="vehicles/" element={<Vehicles />} />
        <Route path="vehiclesInfo/:uid" element={<VehicleInfo />} />
        <Route path="planets/" element={<Planets />} />
        <Route path="planetsInfo/:uid" element={<PlanetInfo />} />
      </Routes>
    </div>
  );
}

export default App;
