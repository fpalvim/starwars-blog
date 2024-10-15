import { useEffect, useState, createContext, useReducer } from "react";
import axios from "axios";


let url = "https://www.swapi.tech/api/people";
let urlPlanet = "https://www.swapi.tech/api/planets";
let urlVehicle = "https://www.swapi.tech/api/vehicles?page=1&limit=10"

export const StarWarsContext = createContext(null);

export const StarWarsProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [favorites, dispatch] = useReducer(favReducer, JSON.parse(localStorage.getItem("favorites")) || [])
  const [favoritePlanets, dispatchPlanets] = useReducer(favPlanetsReducer, JSON.parse(localStorage.getItem("favoritePlanets")) || [])
  const [favoriteVehicles, dispatchVehicles] = useReducer(favVehiclesReducer, JSON.parse(localStorage.getItem("favoriteVehicles")) || [])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchPeople() {
      let response = await axios.get(url);
      const { data } = response;
      setPeople(data.results);
    }
    async function fetchPlanet() {
      let response = await axios.get(urlPlanet);
      const { data } = response;
      setPlanet(data.results);
    }
    async function fetchVehicle() {
      let response = await axios.get(urlVehicle);
      const { data } = response;
      setVehicle(data.results);
      console.log(data.next);
      
  }
    fetchPeople();
    fetchPlanet();
    fetchVehicle();
  }, []);

  function favReducer(favorites, action) {
    switch (action.type) {
      case 'added': {
        localStorage.setItem("favorites", JSON.stringify([
          ...favorites,
            action.payload
        ]))
        return [
          ...favorites,
            action.payload
        ];
      }
        case 'deleted': {
        localStorage.setItem("favorites", JSON.stringify(favorites.filter((i) => i.name !== action.payload.name)))
        const ParsedFavorites = JSON.parse(localStorage.getItem("favorites"))
        return ParsedFavorites
      }
    }
  }

  function favPlanetsReducer(favoritePlanets, action) {
    switch (action.type) {
      case 'added': {
        localStorage.setItem("favoritePlanets", JSON.stringify([
          ...favoritePlanets,
            action.payload
        ]))
        return [
          ...favoritePlanets,
            action.payload
        ];
      }
        case 'deleted': {
        localStorage.setItem("favoritePlanets", JSON.stringify(favoritePlanets.filter((i) => i.name !== action.payload.name)))
        const ParsedFavoritePlanets = JSON.parse(localStorage.getItem("favoritePlanets"))
        return ParsedFavoritePlanets
      }
    }
  }

  function favVehiclesReducer(favoriteVehicles, action) {
    switch (action.type) {
      case 'added': {
        localStorage.setItem("favoriteVehicles", JSON.stringify([
          ...favoriteVehicles,
            action.payload
        ]))
        return [
          ...favoriteVehicles,
            action.payload
        ];
      }
        case 'deleted': {
        localStorage.setItem("favoriteVehicles", JSON.stringify(favoriteVehicles.filter((i) => i.name !== action.payload.name)))
        const ParsedFavoriteVehicles = JSON.parse(localStorage.getItem("favoriteVehicles"))
        return ParsedFavoriteVehicles
      }
    }
  }


  return (
    <StarWarsContext.Provider value={{ people, planet, vehicle, favReducer, favVehiclesReducer, favoriteVehicles, dispatchVehicles, favPlanetsReducer, favoritePlanets, dispatchPlanets, favorites, dispatch, favReducer, searchQuery, setSearchQuery}}>
      {children}
    </StarWarsContext.Provider>
  );
};