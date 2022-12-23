import React from 'react'

export function NewsItem(props) {

    let { title, description, imageUrl, newsUrl, author, datePosted, source } = props
    return (
        <>
            <div className="my-3">
                <div className="card h-100">
                    {/* <img src={imageUrl} className="card-img-top img-fluid" alt={description} /> */}
                    <img src={imageUrl} className="card-img-top img-fluid" alt={description} onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">Posted by <span className='text-danger'>{author}</span> on {new Date(datePosted).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                    <div className="card-footer"><small className='text-muted'>{source}</small></div>
                </div>
            </div>
        </>
    )

}

export default NewsItem