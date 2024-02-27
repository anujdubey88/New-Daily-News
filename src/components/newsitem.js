import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imgurl,newsurl,author,date,source}=this.props;

    return (
      <>
      <div className='my-3 t'>
        <div className="card " >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}</span>
          <img src={imgurl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By: {author? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      
</>
    )
  }
}
export default Newsitem