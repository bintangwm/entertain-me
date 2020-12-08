import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router-dom'
const ADD_MOVIE = gql`
  mutation AddMovie($data: movieInput) {
    addMovie(data: $data) {
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


export default  function AddMovie() {
  const [formInput, setFormInput] = React.useState({
    title: '', overview: '', poster_path: '', popularity: '', tags: ''
  })
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      { query: GET_DATA }
    ]
  })
  const history = useHistory()

  function handleFormInput(e) {
    const key = e.target.name
    let value = e.target.value
    if (key === "popularity") {
      value = +value
    } 
    setFormInput({
      ...formInput,
      [key]: value
    })
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log(formInput);
    addMovie({
      variables: {
        data: formInput
      }
    })
    history.push('/')
  }
  return(
    <div className="container">
      <h1>Add Movie</h1>
      <hr/>
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