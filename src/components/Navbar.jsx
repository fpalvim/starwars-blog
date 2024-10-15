import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { StarWarsContext } from "../context/MyContext";


const Navbar = () => {
    const {searchQuery, setSearchQuery, favoriteVehicles, dispatchVehicles, favorites, favoritePlanets, dispatchPlanets, dispatch, handleCategory} = useContext(StarWarsContext)

    const handleSearch = (e) => {
      const searchWord = e.target.value
      setSearchQuery(searchWord)
    }

    function handleDeleteFav(characters) {
      dispatch({
        type: 'deleted',
        payload: characters
      });
    }

    function handleDeletePlanetFav(thisPlanet) {
      dispatchPlanets({
        type: 'deleted',
        payload: thisPlanet,
      });
    }

    function handleDeleteVehicleFav(myVehicle) {
      dispatchVehicles({
        type: 'deleted',
        payload: myVehicle,
      });
    }


  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <span>
          <Link to="/">
            {" "}
            <BiCameraMovie className="site-icon" />
          </Link>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link onClick={() => handleCategory("chars")} to="/characters">Chars</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleCategory("vehicle")} to="/vehicles">Vehicles</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleCategory("planet")} to="/planets">Planets</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorite charachters
              </button>
                <ul className="dropdown-menu">
                  {
                    favorites.map(i =>(
                      <>
                        <li key={i.uid}>{i.name}<span type="button" onClick={()=>handleDeleteFav(i)}><FaTrash /></span></li>
                        <hr className="dropdown-divider"></hr>
                      </>
                    ))
                  }
                </ul>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorite vehicles
              </button>
                <ul className="dropdown-menu">
                  {
                    favoriteVehicles.map(vehicleFavList =>(
                      <>
                        <li key={vehicleFavList.uid}>{vehicleFavList.name}<span type="button" onClick={()=>handleDeleteVehicleFav(vehicleFavList)}><FaTrash /></span></li>
                        <hr className="dropdown-divider"></hr>
                      </>
                    ))
                  }
                </ul>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorite planets
              </button>
                <ul className="dropdown-menu">
                  {
                    favoritePlanets.map(planetFavList =>(
                      <>
                        <li key={planetFavList.uid}>{planetFavList.name}<span type="button" onClick={()=>handleDeletePlanetFav(planetFavList)}><FaTrash /></span></li>
                        <hr className="dropdown-divider"></hr>
                      </>
                    ))
                  }
                </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              value={searchQuery}
              onChange={(e)=>handleSearch(e)}
              className="form-control me-2"
              type="search"
              placeholder="Search here..."
              aria-label="Search"
            ></input>
            <button onClick={handleSearch} className="btn btn-outline-dark border-3" type="submit">
              <IoMdSearch className="search-icon" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
