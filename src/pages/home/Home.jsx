import React from 'react';
import "./Home.scss";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Photo from "../../assets/image/noAvatar.png";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getIdUserByLoginGGApi } from '../../redux/user/UserApi';
import MovieBanner from "../../assets/image/MovieBanner.jpg"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { getMovieSmallApi } from '../../redux/movie/MovieApi';

const Home = () => {
  const RECOMMENDATIONS = process.env.REACT_APP_PUBLIC_API_RECOMMENDATIONS;
  const PK = process.env.REACT_APP_PUBLIC_API;
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token)
  const tokenGG = useSelector(state => state.googleLogin.tokenGG)
  const isAuth = useSelector(state => state.auth.isAuth)

  const [movie, setMovie] = useState([]);

   // lấy ra id user khi đăng nhập bằng gg để tạo vé
   const userLoginGG = useSelector(state => state.user.user);
   useEffect(() =>{
     if(tokenGG || token){
       const getIdUserByLoginGG = async () => {
         await getIdUserByLoginGGApi(token?.email || token?.Email, dispatch);
       }
       getIdUserByLoginGG();
     }
   },[tokenGG, token])

   // =============== Gợi ý phim ==============
   const [recomments, setRecomments] = useState([]);
 

  // kết quả ma trận raiting
  const PKRaiting = process.env.REACT_APP_PUBLIC_API_RECOMMENDATIONS;
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
  
  useEffect(() => {
    if (results && results?.predicted_ratings) {
      const predictedRatings = results.predicted_ratings;
      let dem =0
      for (let i = 0; i < predictedRatings.length; i++) {
        const userId = userIds[i];
        const userIndex = i;
    
        for (let j = 0; j < predictedRatings[i].length; j++) {
          const movieId = movieIds[j];
          const movieIndex = j;
      
          const rating = predictedRatings[i][j].toFixed(2);

          // Bạn có thể sử dụng thông tin này để hiển thị hoặc xử lý dữ liệu theo yêu cầu của bạn
          if(userLoginGG?.data.id === userId){ 
            if(rating > 0.00){
              dem++;
              setMovie(prevMovie => [...prevMovie, movieId]);
            }            
          }
          if(userIds)
          {
            if(!userIds.includes(userLoginGG?.data.id)){
              const getMovieTopRating = async () => {
                const res = await axios.get(`${PK}/movie/toprating`)
                if(res.data){
                  setRecomments(res.data)
                }
              }
              getMovieTopRating();
            }

          }
        }
      }
      if(dem === 0){
        const getMovieTopRating = async () => {
          const res = await axios.get(`${PK}/movie/toprating`)
          if(res.data){
            setRecomments(res.data)
          }
        }
        getMovieTopRating();
      }
    }
  }, [results])

  

  useEffect(() => {
    const getMovieById = async () => {
      const uniqueMovies = Array.from(new Set(movie)); // Lọc các phần tử duy nhất trong mảng movie
      const tempRecomments = [];
  
      for (const item of uniqueMovies) {
        const res = await axios.get(`${PK}/movie/${item}`);
        if (res.data) {
          tempRecomments.push(res.data);
        }
      }
      setRecomments(tempRecomments);
    };
  
    if (movie.length > 0) {
      getMovieById();
    }
  }, [movie]);
 

  // làm hiệu ứng slide trược
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);

  // khi nhấn vào mũi tên phải
  const handleItemRight = () => {
    if (endIndex + 1 < recomments?.length) {
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex + 1);
    }
  };

  // khi nhấn vào mũi tên trái
  const handleItemLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      setEndIndex(endIndex - 1);
    }
  };


  // chuyển trang
  const navigate = useNavigate();
  const handleMoveBuyTicket = () => {
    navigate("/muave")
  }

  const handleMoveMovieDetail = (movieDetail) => {
    console.log(movieDetail);
    navigate("/muavetheophim", { state: { movie: {data: movieDetail} } });
  }

  return (
    <div className="home">
      {
        (token || tokenGG)
        ? (
            <div className="buyticket-movie">
              <div className="buyticket-movie-2">
                <div className="buyticket-movie-title">
                  <h1>Gợi ý cho bạn</h1>
                </div>
                <div className="buyticket-movie-lists">
                  {startIndex > 0 && (
                    <KeyboardArrowLeftIcon
                      onClick={() => handleItemLeft()}
                      className="buyticket-movie-left"
                    />
                  )}
                  {recomments?.slice(startIndex, endIndex + 1).map((movie, index) => {
                    
                    return (
                      <div
                        onClick={() => handleMoveMovieDetail(movie.data)}
                        key={index}
                        className={`buyticket-movie-item`}
                      >
                        <div className="buyticket-movie-img">
                          <img src={movie?.data.mainSlide || Photo} alt="" />
                          <p>Mua vé</p>
                        </div>
                        <div className="buyticket-movie-name">
                          <h2>{movie?.data.name}</h2>
                          <h3>{movie?.data.category}</h3>
                          <p className="buyticket-movie-star">
                            <ThumbUpOffAltIcon />
                            {Math.round(movie?.data.totalPercent) + '%'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                   {startIndex > 0 && (
                  <KeyboardArrowRightIcon
                    onClick={() => handleItemRight()}
                    className="buyticket-movie-right"
                  />
                   )}
                </div>
              </div>
            </div>
          )
        : (
          <div className="home-img">
            <img src={MovieBanner} alt="" />
            <div className="home-img-info">
              <h1>Đặt mua vé xem phim Moveek</h1>
              <p>
                <CheckCircleIcon />
                Mua vé Online, trải nghiệm phim hay
              </p>
              <p>
                <CheckCircleIcon />
                Đặt vé an toàn trên Moveek
              </p>
              <p>
                <CheckCircleIcon />
                Tha hồ chọn chỗ ngồi, mua bắp nước tiện lợi.
              </p>
              <p>
                <CheckCircleIcon />
                Lịch sử đặt vé được lưu lại ngay
              </p>
              <button onClick={() => handleMoveBuyTicket()}>Đặt vé ngay</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home