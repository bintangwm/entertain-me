import React from 'react'

export default function SerieCard({ data }) {
  
  return(
    <div className="card shadow entertain-card">
      <div className="inner">
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
    </div>
  )
}