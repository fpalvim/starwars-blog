
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const urlPlanets = "https://swapi.dev/api/planets";
let urlImagePlanets = "https://starwars-visualguide.com/assets/img/planets/"

const PlanetInfo = () => {
  const [planets, setPlanets] = useState({});
  
  const { uid } = useParams();
  
  let imgPlanets = `${urlImagePlanets}${uid}.jpg`

  useEffect(() => {
    async function getPlanet() {
      let response = await axios.get(`${urlPlanets}/${uid}`);
      setPlanets(response.data);
    }

    getPlanet();
  }, []);

  const formatNumber = (n) => {
    return (new Intl.NumberFormat().format(n)) 
  }


  return (
    <div className="info-card">
      {planets ? (
        <div className="planet-info-card-img">
          <img src={imgPlanets} />
            <div className="info-card-text">
              <div>Name: {planets.name}</div>
              <div>Diameter: {formatNumber(planets.diameter)}</div>
              <div>Rotation period: {planets.rotation_period}</div>
              <div>Gravity: {planets.gravity}</div>
              <div>Population: {formatNumber(planets.population)}</div>
              <div>Climate: {planets.climate}</div>
              <div>Terrain: {planets.terrain}</div>
            </div>
        </div>
      ) : (
        "loading"
      )}{" "}
    </div>
  );
};

export default PlanetInfo;
