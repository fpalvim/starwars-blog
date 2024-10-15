import { useEffect, useState, createContext, useReducer } from "react";
import axios from "axios";

export const StarWarsContext = createContext(null);

export const StarWarsProvider = ({ children }) => {
  const [chars, setChars] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [favorites, dispatch] = useReducer(favReducer, JSON.parse(localStorage.getItem("favorites")) || [])
  const [favoritePlanets, dispatchPlanets] = useReducer(favPlanetsReducer, JSON.parse(localStorage.getItem("favoritePlanets")) || [])
  const [favoriteVehicles, dispatchVehicles] = useReducer(favVehiclesReducer, JSON.parse(localStorage.getItem("favoriteVehicles")) || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState(sessionStorage.getItem("category"))
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    sessionStorage.setItem("category", category)
    async function fetchData() {
      if (category === "chars") {
      let response = await axios.get(`https://www.swapi.tech/api/people?page=${currentPage}&limit=12`);
      const { data } = response;
      setChars(data.results);
      const totalPages = Math.ceil(data.total_records/12)
      setTotalPages(totalPages) 
    } if (category === "planet") {
      let response = await axios.get(`https://www.swapi.tech/api/planets?page=${currentPage}&limit=12`);
      const { data } = response;
      setPlanet(data.results);
      const totalPages = Math.ceil(data.total_records/12)
      setTotalPages(totalPages)  
    } if (category === "vehicle") {
      let response = await axios.get(`https://www.swapi.tech/api/vehicles?page=${currentPage}&limit=8`);
      const { data } = response;
      setVehicle(data.results);
      const totalPages = Math.ceil(data.total_records/8)
      setTotalPages(totalPages)  
    }}

    fetchData();

  }, [currentPage, category]);
  
  const nextPage = () => {
    if(currentPage < totalPages) {
      setCurrentPage(currentPage +1)}
    }

  const prevPage = () => setCurrentPage(Math.max(currentPage - 1, 1))

  const handleCategory = (currentCategory) => {
    setCategory(currentCategory)
    setCurrentPage(1)
  }

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
    <StarWarsContext.Provider value={{ chars, planet, vehicle, favReducer, favVehiclesReducer, favoriteVehicles, dispatchVehicles, favPlanetsReducer, favoritePlanets, dispatchPlanets, favorites, dispatch, favReducer, searchQuery, setSearchQuery, nextPage, prevPage, currentPage, handleCategory}}>
      {children}
    </StarWarsContext.Provider>
  );
};