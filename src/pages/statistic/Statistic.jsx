import axios from 'axios'
import React, { useEffect, useState } from 'react';
import "./Statistic.scss"

const Statistic = () => {
  const PKRaiting = process.env.REACT_APP_PUBLIC_API_RECOMMENDATIONS;
  const PK = process.env.REACT_APP_PUBLIC_API;

  const [comments, setComments] = useState();
  useEffect(() => {
    const comments = async () => {
        const res = await axios.get(`${PK}/resultraiting`)
        if(res.data){
            setComments(res.data);
        }
    }
    comments();
  }, [])

 // Tạo đối tượng lưu trữ giá trị từng userId và movieId
 const matrixData = {};

 // Lặp qua mảng jsonData để gán giá trị countStars vào từng userId_movieId
 for (let i = 0; i < comments?.length; i++) {
    const item = comments[i];
    const userId = item.data.userId;
    const movieId = item.data.movieId;
    const countStars = item.data.countStars;
    const key = `${userId}_${movieId}`;
    matrixData[key] = countStars;
  }

  // Tìm ra danh sách các userId và movieId duy nhất
  const userIds = Array.from(new Set(comments?.map(item => item.data.userId)));
  const movieIds = Array.from(new Set(comments?.map(item => item.data.movieId)));
 
  // Tạo ma trận với kích thước tương ứng và gán giá trị 0 cho các giá trị null
  const matrix = [];
  for (let i = 0; i < userIds.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < movieIds.length; j++) {
      const key = `${userIds[i]}_${movieIds[j]}`;
      matrix[i][j] = matrixData[key] || 0;
    }
  }
  const [results, setResults] = useState();

  useEffect(()=>{
    if(comments){
      const results = async() => {
        const res = await axios.post(`${PKRaiting}/recommendations`, {ratings: matrix});
        if(res.data){
          setResults(res.data);
        }
      }
      results();
    }
  }, [comments])
  
  return (
    <div className="statistic">
      <div className="cosine">
          <h1>Ma trận Cosine</h1>
          <div className="statistic-movie-top">
            {
              movieIds?.map(movieId =>{
                return (
                  <div className="cosine-movie-top">
                    <p>{movieId}</p>
                  </div>
                )
              })
            }
          </div>
          <div className="statistic-movie-content">
            <div className="statistic-movie-left">
            {
              movieIds?.map(movieId =>{
                  return (
                    <div className="cosine-movie-left">
                      <p>{movieId}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="statistic-movie-center">
              {
                results?.item_correlation?.map((cs,index) => {
                  const roundedValues = cs.map((value) => value.toFixed(2));
                  return (
                      <p key={index} className="number-list">{roundedValues.join(' || ')}</p>
                  )
                })
              }
            </div>
          </div>
      </div>
      <div className="raitings">
      <h1>Ma trận Raiting</h1>
          <div className="statistic-movie-top">
            {
              movieIds?.map(movieId =>{
                return (
                  <div className="cosine-movie-top">
                    <p>{movieId}</p>
                  </div>
                )
              })
            }
          </div>
          <div className="statistic-movie-content">
            <div className="statistic-movie-left">
            {
              userIds?.map(userId =>{
                  return (
                    <div className="cosine-movie-left">
                      <p>{userId}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="statistic-movie-center">
              {
                results?.predicted_ratings?.map((rt,index) => {
                  const roundedValues = rt.map((value) => value.toFixed(2));
                  return (
                      <p key={index} className="number-list">{roundedValues.join(' || ')}</p>
                  )
                })
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Statistic