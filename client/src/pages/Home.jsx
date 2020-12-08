import React from 'react'
import { useQuery, gql } from '@apollo/client'
import MovieCard from '../components/MovieCard'
import SerieCard from '../components/SerieCard'

const GET_DATA = gql`
  query getData {
    movies{
      _id
      title
      popularity
      poster_path
    }  
    series{
      _id
      title
      popularity
      poster_path
    }  
  }
`


export default function Home() {
  const { loading, error, data } = useQuery(GET_DATA)

  if (loading || error) {
    return(
      <div className="container">
      <h1>Home</h1>
      <hr/>
      <div>
        {
          (error)
            ? <div className="alert alert-danger" role="alert">
                There is something error with query!
              </div>
            : <div className="alert alert-info" role="alert">
                Loading your data...
              </div>
        }
      </div>
    </div>
    )
    
  }

  return(
    <div className="container">
      <h1>Home</h1>
      <hr/>
      <div>
        <h2>Movie List</h2>
        <hr/>
        <div className="d-flex flex-row align-content-around flex-wrap">
          {
            data.movies.map((movie) => {
              return(
                <MovieCard 
                  key={movie._id}
                  data={movie}
                />
              )
            })
          }
        </div>
        <h2>Series List</h2>
        <hr/>
        <div className="row">
          {
            data.series.map(serie => {
              return(
                <SerieCard 
                  key={serie._id}
                  data={serie}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}