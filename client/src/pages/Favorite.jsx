import React, { useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import client, { favoritesVars as favorites } from '../config/graphql' 
import { GET_FAVORITES } from '../config/queries'

export default function Favorite() {

  useEffect(() => {
    const cache = client.readQuery({
      query: GET_FAVORITES
    })
    console.log(cache);
  }, [])

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