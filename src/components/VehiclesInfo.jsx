
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const urlVehicles = "https://swapi.dev/api/vehicles";
let urlImageVehicles = "https://starwars-visualguide.com/assets/img/vehicles/"

const VehicleInfo = () => {
  const [vehicles, setVehicles] = useState({});
  
  const { uid } = useParams();
  
  let imgVehicles = `${urlImageVehicles}${uid}.jpg`

  useEffect(() => {
    async function getVehicle() {
      let response = await axios.get(`${urlVehicles}/${uid}`);
      setVehicles(response.data);

      console.log({vehicles});
    }

    getVehicle();
  }, []);

  const formatNumber = (n) => {
    return (new Intl.NumberFormat().format(n)) 
  }

  return (
    <div className="info-card">
      {vehicles ? (
        <div className="info-card-img">
          <img src={imgVehicles} />
            <div className="info-card-text">
              <div>Name: {vehicles.name}</div>
              <div>Model: {vehicles.model}</div>
              <div>Manufacturer: {vehicles.manufacturer}</div>
              <div>Cost in credits: {formatNumber(vehicles.cost_in_credits)}</div>
              <div>Length: {`${vehicles.length}`}</div>
              <div>Crew: {vehicles.crew}</div>
              <div>Passengers: {vehicles.passengers}</div>
              <div>Cargo Capacity: {formatNumber(vehicles.cargo_capacity)}</div>
              <div>Vehicle Class: {vehicles.vehicle_class}</div>
            </div>
        </div>
      ) : (
        "loading"
      )}{" "}
    </div>
  );
};

export default VehicleInfo;
