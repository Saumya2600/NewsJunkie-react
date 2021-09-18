import React, { Component } from 'react'

const NewsItem =(props)=> {
        let { title, description, imageUrl, newUrl, author, date } = props;
        return (
            <div>
                <div className="card"   >
                    <img src={!imageUrl ? "https://static.toiimg.com/photo/86070312.cms" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p class="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
