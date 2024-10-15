import { useContext, React} from 'react'
import { StarWarsContext } from '../context/MyContext'
import { Link } from 'react-router-dom'
import { GiStarfighter } from "react-icons/gi";


const Vehicles = () => {
const {vehicle, favoriteVehicles, dispatchVehicles, searchQuery, nextPage, prevPage, currentPage} = useContext(StarWarsContext)
let urlImage = "https://starwars-visualguide.com/assets/img/vehicles/"

function handleAddVehicleFav(myVehicle) {
  dispatchVehicles({
    type: 'added',
    payload: myVehicle,
  });
}

function handleDeleteVehicleFav(myVehicle) {
  dispatchVehicles({
    type: 'deleted',
    payload: myVehicle,
  });
}

function handleVFavVehicle(myVehicle){
  const isFavVehicle = favoriteVehicles.some(i=> i.name === myVehicle.name)
  console.log(isFavVehicle)
  if (isFavVehicle){
    handleDeleteVehicleFav(myVehicle)
  } else {
    handleAddVehicleFav(myVehicle)
  }
}

const filterVehicles = vehicle.filter((i) =>
  i.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <>
      <div className='cards-container'>
        {
          filterVehicles.map((vehicles)=>(
            <div className='cards ' key={vehicles.uid}>
              <div className='cards-content-holder'>
                <div className='cards-header'>
                  <div>
                    <img className='cards-img-item' src={`${urlImage}${vehicles.uid}.jpg`} />
                  </div>
                  <div className='cards-title'>
                    <h3>{vehicles.name}</h3>
                  </div>
                </div>  
                <div className='cards-footer'>
                  <Link to = {`/vehiclesInfo/${vehicles.uid}`}>
                    <button>Learn more!</button>
                  </Link>
                  <span style={{color: favoriteVehicles.some(fav => fav.uid === vehicles.uid) ? "green" : "" }} className='add-to-favorite' type="button" onClick={()=> handleVFavVehicle(vehicles)}><GiStarfighter /></span>
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

export default Vehicles