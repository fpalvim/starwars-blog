
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const url = "https://swapi.dev/api/people";
let urlImage = "https://starwars-visualguide.com/assets/img/characters/"

const CharInfo = () => {
  const [person, setPerson] = useState({});
  
  const { uid } = useParams();
  
  let img = `${urlImage}${uid}.jpg`

  useEffect(() => {
    async function getPerson() {
      let response = await axios.get(`${url}/${uid}`);
      setPerson(response.data);

      console.log(person);
    }

    getPerson();
  }, []);

  return (
    <div className="info-card">
      {person ? (
        <div className="info-card-img">
          <img src={img} />
            <div className="info-card-text">
              <div>Name: {person.name}</div>
              <div>Birth Year: {person.birth_year}</div>
              <div>Gender: {person.gender}</div>
              <div>Height: {person.height}</div>
              <div>Skin Color: {person.skin_color}</div>
              <div>Eye Color: {person.eye_color}</div>
            </div>
        </div>
      ) : (
        "loading"
      )}{" "}
    </div>
  );
};

export default CharInfo;
