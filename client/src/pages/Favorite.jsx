import React from 'react'
import MovieCard from '../components/MovieCard'
import { favoritesVars as favorites } from '../config/graphql' 

export default function Favorite() {
  return(
    <div className="container">
      <h1>Favorite Page</h1>
      <hr/>
      {
        (favorites().length === 0)
          ? <div className="alert alert-warning" role="alert">
              Your favorite list still empty!
            </div>
          : <div className="d-flex flex-row align-content-around flex-wrap">
              {
                favorites().map(favorite => {
                  return(
                    <MovieCard 
                      key={favorite._id}
                      data={favorite}
                    />
                  )
                })
              }
            </div>
      }
    </div>
  )
}