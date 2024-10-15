import { useContext, React} from 'react'
import { StarWarsContext } from '../context/MyContext'
import { Link } from 'react-router-dom'
import { GiLightSabers } from "react-icons/gi";


const Characters = () => {
const {chars, favorites, dispatch, searchQuery, prevPage, nextPage, currentPage} = useContext(StarWarsContext)
let urlImage = "https://starwars-visualguide.com/assets/img/characters/"
console.log(favorites);
console.log(chars);


function handleAddFav(characters) {
  dispatch({
    type: 'added',
    payload: characters,
  });
}

function handleDeleteFav(characters) {
  dispatch({
    type: 'deleted',
    payload: characters,
  });
}

function handleVFav(characters){
  const isFav = favorites.some(i=> i.name === characters.name)
  console.log(isFav)
  if (isFav){
    handleDeleteFav(characters)
  } else {
    handleAddFav(characters)
  }
}

const filterPeople = chars.filter((person) =>
  person.name.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
  <>
    <div className='cards-container'>
        {
          filterPeople.map((chars)=>(
            <div className='cards' key={chars.uid}>
              <div className='cards-content-holder'>
                <div className='cards-header'>
                  <div>
                    <img className='cards-img-item' src={`${urlImage}${chars.uid}.jpg`} />
                  </div>
                  <div className='cards-title'>
                    <h3>{chars.name}</h3>
                  </div>
                </div>
                <div className='cards-footer'>
                  <Link to = {`/charInfo/${chars.uid}`}>
                    <button>Learn more!</button>
                  </Link>
                  <span style={{color: favorites.some(fav => fav.uid === chars.uid) ? "green" : "" }} id='add-to-favorite' type="button" onClick={()=> handleVFav(chars)}><GiLightSabers /></span>
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
)}

export default Characters