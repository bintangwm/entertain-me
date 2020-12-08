import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const GET_MOVIE = gql`
  query getMovie($id: ID) {
    movie(_id: $id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }   
  }
`
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
      overview
      poster_path
      popularity
      tags
    }
  }
`

export default function MovieDetails() {
  const { id } = useParams()
  const [deleteMovie] = useMutation(DELETE_MOVIE)
  // const [deleteMovie] = useMutation(DELETE_MOVIE, {
  //   refetchQueries: [
  //     { query: GET_DATA }
  //   ]
  // })
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id }
  })
  const history = useHistory()

  function onClickDeleteMovie() {
    deleteMovie({
      variables: { id }
    })
    console.log(id);
    history.push('/')
  }

  if (loading || error) {
    return(
      <div className="container">
      <h1>Movie Detail</h1>
      <hr/>
      <div>
        <p>{JSON.stringify(data)}</p>
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
    <div className="movie-detail container">
      <h2>Movie Detail</h2>
      <hr/>
      <div className="row">
        <div className="col-5">
          <div className="movie-detail-image">
            <img className="img-fluid" src={ data.movie.poster_path } alt="movie"/>
          </div>
        </div>
        <div className="col-7">
          <div className="card movie-detail-detail">
            <div className="cardBody p-4">
              <h4>{ data.movie.title }</h4>
              <hr/>
              <table className="table">
                <tbody>
                  <tr>
                    <td>popularity</td>
                    <td>{ data.movie.popularity }</td>
                  </tr>
                  <tr>
                    <td>tags</td>
                    <td>
                      { 
                        data.movie.tags.map((tags, i) => {
                          return(
                          <span className="badge badge-info" key={i} style={{ marginRight: '2px' }}>{ tags }</span>
                          )
                        })
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>overview</td>
                    <td className="movie-item-synopsis">{ data.movie.overview }</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex align-items-right">
                <button onClick={(e) => onClickDeleteMovie(e, data.movie._id)} type="button" className="btn btn-danger">Delete</button>
                <button onClick={() => (history.push(`/edit-movie/${data.movie._id}`))} type="button" className="btn btn-info">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}