import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import 
 { favoritesVars }
from '../config/graphql' 

export default function MovieCard({ data }) {
  const history = useHistory()
  const [newFavorites, setNewFavorites] = useState(false)
  const [found, setFound] = useState(false)

  useEffect(() => {
    setFound(favoritesVars().find(el => el._id === data._id))
  }, [newFavorites, data._id])

  function goToDetails(e, _id) {
    history.push(`/movie/${_id}`)
  }
  
  function removeFavorite() {
    if (favoritesVars().find(el => el._id === data._id)) {
      setNewFavorites(!newFavorites)
      favoritesVars(favoritesVars().filter(el => el._id !== data._id))
    }
  }

  function addFavorite() {
    if (!favoritesVars().find(el => el._id === data._id)) {
      setNewFavorites(!newFavorites)
      favoritesVars(favoritesVars().concat(data));
    }
  }
  
  return(
    <div className="card shadow entertain-card">
      <div onClick={(e) => goToDetails(e, data._id)} className="inner">
        <img className="card-img-top" src={data.poster_path} alt={data.title}/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{ data.title }</h5>
        { 
          data.tags.map((tag, i) => {
            return(
            <span className="badge badge-info" key={i} style={{ marginRight: '2px' }}>{ tag }</span>
            )
          })
        }
      </div>
      <span className="badge badge-secondary popularity-badge">
        <i className="fas fa-star" style={{ color: 'yellow' }}></i>
        { data.popularity }
      </span>
      {
        (found)
          ? <i onClick={removeFavorite} className="fas fa-heart favorite-logo" style={{ color: 'red' }}></i>
          : <i onClick={addFavorite} className="fas fa-heart favorite-logo"></i>
      }
      {/* {
        (found)
          ? <div onClick={removeFavorite} className="favorite-logo" style={{ backgroundColor: 'red', width: '15px', height: '15px' }}></div>
          : <div onClick={addFavorite} className="favorite-logo" style={{ backgroundColor: 'gray', width: '15px', height: '15px' }}></div>
      } */}
    </div>
  )
}