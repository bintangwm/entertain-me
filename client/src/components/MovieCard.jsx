import { useMutation, gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import 
 { favoritesVars }
from '../config/graphql' 

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: String) {
    deleteMovie(id: $id) {
      _id
      title
    }
  }
`
const GET_DATA = gql`
  query getData {
    movies{
      _id
      title
      popularity
      poster_path
    }
  }
`


export default function MovieCard({ data }) {
  const history = useHistory()
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      { query: GET_DATA }
    ]
  })
  const [newFavorites, setNewFavorites] = useState(false)
  let found = favoritesVars().find(el => el._id === data._id)

  useEffect(() => {
    found = favoritesVars().find(el => el._id === data._id)
  }, [newFavorites])

  function goToDetails(e, _id) {
    history.push(`/movie/${_id}`)
  }

  function onClickDeleteMovie(e, id) {
    deleteMovie({
      variables: { id }
    })
  }
  
  function removeFavorite() {
    setNewFavorites(!newFavorites)
    favoritesVars(favoritesVars().filter(el => el._id !== data._id))
  }

  function addFavorite() {
    setNewFavorites(!newFavorites)
    favoritesVars(favoritesVars().concat(data));
  }
  
  return(
    <div className="card shadow entertain-card">
      <div className="inner">
        <img onClick={(e) => goToDetails(e, data._id)} className="card-img-top" src={data.poster_path} alt={data.title}/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{ data.title }</h5>
        <button onClick={(e) => onClickDeleteMovie(e, data._id)} type="button" style={{ fontSize: 10, padding: 3 }} className="btn btn-danger">Delete</button>
        <button onClick={(e) => (history.push(`/edit-movie/${data._id}`))} type="button" style={{ fontSize: 10, padding: 3 }} className="btn btn-info">Edit</button>
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