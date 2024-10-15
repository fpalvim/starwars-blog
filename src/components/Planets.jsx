import { useContext, React} from 'react'
import { StarWarsContext } from '../context/MyContext'
import { Link } from 'react-router-dom'
import { IoPlanetOutline } from "react-icons/io5";


const Planets = () => {
const {planet, favoritePlanets, dispatchPlanets, searchQuery, prevPage, nextPage, currentPage} = useContext(StarWarsContext)
let urlImage = "https://starwars-visualguide.com/assets/img/planets/"

function handleAddPlanetFav(thisPlanet) {
  dispatchPlanets({
    type: 'added',
    payload: thisPlanet,
  });
}

function handleDeletePlanetFav(thisPlanet) {
  dispatchPlanets({
    type: 'deleted',
    payload: thisPlanet,
  });
}

function handleFavPlanets(thisPlanet){
  const isFavPlanet = favoritePlanets.some(planet=> planet.name === thisPlanet.name)
  console.log(isFavPlanet);
  if (isFavPlanet){
    handleDeletePlanetFav(thisPlanet)
  } else {
    handleAddPlanetFav(thisPlanet)
  }
console.log(favoritePlanets);
}

const filterPlanets = planet.filter((i) =>
  i.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <>
      <div className='cards-container'>
        {
          filterPlanets.map((planets)=>(
            <div className='cards' key={planets.uid}>
              <div className='cards-content-holder'>
                  <div className='cards-header'>
                    <div>
              <img className='cards-img-item' src={`${urlImage}${planets.uid}.jpg`} />
              </div>
              <div className='cards-title'>
              <h3>{planets.name}</h3>
              </div>
              <div className='cards-footer'>
                <Link to = {`/planetsInfo/${planets.uid}`}>
                  <button>Learn more!</button>
                </Link>
                <span style={{color: favoritePlanets.some(fav => fav.uid === planets.uid) ? "green" : "" }} onClick={()=> handleFavPlanets(planets)} className='add-to-favorite' type="button" ><IoPlanetOutline /></span>
              </div>
            </div>
            </div>
            </div>
          ))
        }
      </div>
      <div className='navigate-pages-bar'>
          <button className='navigate-pages-button' onClick={prevPage}>Prev Page</button>
          <span><h3 className='current-page-index'>{currentPage}</h3></span>
          <button className='navigate-pages-button' onClick={nextPage}>Next Page</button>
      </div>
    </>
  )
}

export default Planets