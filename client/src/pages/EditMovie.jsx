import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

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
// const GET_DATA = gql`
//   query getData {
//     movies{
//       _id
//       title
//       popularity
//       poster_path
//       tags
//       overview
//     }
//   }
// `
const EDIT_MOVIE = gql`
  mutation updateMovie($data: movieInput, $id: String) {
    updateMovie(data: $data, id: $id) {
      _id
      title
      popularity
      poster_path
      tags
      overview
    }
  }
`

export default function EditMovie() {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      id
    }
  })
  const [formInput, setFormInput] = React.useState({
    title: '', overview: '', poster_path: '', popularity: '', tags: ''
  })
  // const [editMovie] = useMutation(EDIT_MOVIE, {
  //   refetchQueries: [
  //     { query: GET_DATA }
  //   ]
  // })
  const [editMovie] = useMutation(EDIT_MOVIE)
  const history = useHistory()
  const [errorInput, setErrorInput] = useState('')

  useEffect(() => {
    if (data?.movie) {
      setFormInput({
        title: data.movie.title, 
        overview: data.movie.overview, 
        poster_path: data.movie.poster_path, 
        popularity: data.movie.popularity, 
        tags: data.movie.tags.join(',')
      })
    }
  }, [data])

  function handleFormInput(e) {
    const key = e.target.name
    let value = e.target.value
    if (key === 'popularity') {
      value = Number(value)
    }
    setFormInput({
      ...formInput,
      [key]: value
    })
  }

  function onSubmit(e) {
    e.preventDefault()
    setErrorInput('')
    const { title, tags, overview, popularity, poster_path } = formInput
    if (!title || !tags || !overview || popularity <= 0 ||isNaN(popularity) || !poster_path) {
      return setErrorInput('Please insert all forms!')
    }
    editMovie({
      variables: {
        data: formInput,
        id: id
      }
    })
    Swal.fire(
      'Update Movie',
      'Movie updated successfully',
      'success'
    )
    history.push('/')
  }

  if (loading || error || !data.movie) {
    return(
      <div className="container">
      <h1>Edit Movie</h1>
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

  return (
    <div className="container">
      <h1>Edit Movie</h1>
      <hr/>
      {
        (errorInput) &&
        <div className="alert alert-danger" role="alert">
          { errorInput }
        </div>
      }
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={formInput.title} onChange={handleFormInput} name="title" className="form-control" type="text"/>
        </div>
        <div className="form-group">
          <label>Overview</label>
          <textarea value={formInput.overview} onChange={handleFormInput} name="overview" className="form-control" rows="2"></textarea>
        </div>
        <div className="form-group">
          <label>Poster path</label>
          <input value={formInput.poster_path} onChange={handleFormInput} name="poster_path" className="form-control" type="text"/>
        </div>
        <div className="form-group">
          <label>Popularity</label>
          <input value={formInput.popularity} onChange={handleFormInput} name="popularity" className="form-control" type="number"/>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input value={formInput.tags} onChange={handleFormInput} name="tags" className="form-control" type="text" placeholder="use , to separate genre, eg: action,comedy"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}