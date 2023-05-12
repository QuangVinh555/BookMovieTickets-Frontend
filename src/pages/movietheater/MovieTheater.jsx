import React from 'react';
import "./MovieTheater.scss";

const MovieTheater = () => {
  return (
    <div className="movietheater">
        <button className="movietheater-btn">Vị trí</button>
        <button className="movietheater-btn">Loại rạp</button>
        <button className="movietheater-btn">Tên rạp</button>
        <button className="movietheater-btn">Phòng chiếu</button>
        <button className="movietheater-btn">Loại ghế</button>
        <button className="movietheater-btn">Ghế</button>
    </div>
  )
}

export default MovieTheater