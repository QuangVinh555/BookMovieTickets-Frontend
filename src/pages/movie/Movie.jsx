import React from 'react';
import "./Movie.scss";

const Movie = () => {
  return (
    <div className="movie">
        <button className="movie-btn">Thông tin phim</button>
        <button className="movie-btn">Phim đang chiếu</button>     
        <button className="movie-btn">Phim sắp chiếu</button>     
    </div>
  )
}

export default Movie