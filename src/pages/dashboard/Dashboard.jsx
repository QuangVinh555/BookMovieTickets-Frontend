import React,{useRef, useEffect, useState} from 'react';
import { Chart } from 'chart.js';
import "./Dashboard.scss";
import axios from 'axios';
import NoAvatar from "../../assets/image/noAvatar.png";
import All from "../../assets/image/all.png";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from "@mui/icons-material/Search";
import { getAllSearchLocationApi } from '../../redux/location/LocationApi';
import { getAllCinemaTypesApi } from '../../redux/cinemaType/CinemaTypeApi';
import { getAllCinemaNamesApi, getAllCinemaNamesByCinemaTypeIdApi, getAllCinemaNamesByLocationIdAndCinemaTypeIdApi, getAllCinemaNamesByLocationIdApi } from '../../redux/cinemaName/CinemaNameApi';


const Dashboard = () => {
  const chartRef = useRef(null);
  const PK = process.env.REACT_APP_PUBLIC_API;
  const cinemaNames = useSelector((state) => state.cinemaName.listSearch);
  const cinemaTypes = useSelector((state) => state.cinemaType.cinemaTypes);
  const locations = useSelector((state) => state.location.listSearch);
  const cinemaNamesByConditions = useSelector(
    (state) => state.cinemaName.cinemaNames
  );


  // ================== thống kê theo phim ==========================
  const [movies, setMovies] = useState();
  // get dashboard movie
  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(`${PK}/dashboard`);
      if(res.data){
        setMovies(res.data);
      }
    }
    getMovies();
  }, [])
  
  // lưu lại mảng tên phim
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Loại biểu đồ (ví dụ: bar, line, pie)
      data: {
        labels: movies?.map(movie => movie.data.movieName),
        datasets: [{
          label: 'Vé được bán',
          data: movies?.map(movie => movie.data.count),
          backgroundColor: '#d82d8b',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [movies]);

  const dispatch = useDispatch();
  // ===================== theo rạp =============================
   // ============Get all==============
  // get all location when open showTime
  useEffect(() => {
    const getAllLocations = async () => {
      await getAllSearchLocationApi(dispatch);
    };
    getAllLocations();
  }, []);

  // get all cinema type when open showTime
  useEffect(() => {
    const getAllCinemaTypes = async () => {
      await getAllCinemaTypesApi(dispatch);
    };
    getAllCinemaTypes();
  }, []);

  // get all cinema name when open ShowTime
  useEffect(() => {
    const getAllCinemaNames = async () => {
      await getAllCinemaNamesApi(dispatch);
    };
    getAllCinemaNames();
  }, []);

  // ===== Kiểm tra điều kiện seach=====
  const [flag, setFlag] = useState(0);
  // flag = 1: Tìm kiếm theo location
  // flag = 2: Tìm kiếm theo Cinema type
  // flag = 3: Tìm kiếm cả 2 cái trên

  // ======= search by location ========
  const [searchByLocationId, setSearchByLocationId] = useState();
  const handleChangeSelectLocation = (e) => {
    if (flag === 2) {
      setFlag(3);
      setSearchByLocationId(parseInt(e.target.value));
    } else {
      setFlag(1);
      setSearchByLocationId(parseInt(e.target.value));
    }
  };

  // ======= search by cinema type
  const [searchByCinemaTypeId, setSearchByCinemaTypeId] = useState();
  const handleClickCinemaType = (cinemaType) => {
    const cinemaTypeElements = document.querySelectorAll('.cinemaroom-type');
    cinemaTypeElements.forEach((cinemaTypeElement) => {
      if(cinemaTypeElement.textContent === cinemaType.name){
            const imgElement = cinemaTypeElement.querySelector("img");
            if(imgElement){
              imgElement.classList.add("active")
            }    
      }else{
        const imgElement = cinemaTypeElement.querySelector("img");
        if(imgElement){
          imgElement.classList.remove("active")
        }
      }  
    })

    if (flag === 1 || flag === 3) {
      setFlag(3);
      setSearchByCinemaTypeId(cinemaType?.id);
    } else {
      setFlag(2);
      setSearchByCinemaTypeId(cinemaType?.id);
    }
    if(cinemaType.name === "Tất cả"){
      setFlag(0)
    }
  };
  // ===== tìm kiếm theo từng điều kiện flag ======
  // theo locationId
  useEffect(() => {
    const getAllCinemaNamesByLocationId = async (param) => {
      if (flag === 1) {
        await getAllCinemaNamesByLocationIdApi(param, dispatch);
      }
    };
    getAllCinemaNamesByLocationId(searchByLocationId);
  }, [searchByLocationId, flag]);

  // theo CinemaTypeId
  useEffect(() => {
    const getAllCinemaNamesByCinemaTypeId = async (param) => {
      if (flag === 2) {
        await getAllCinemaNamesByCinemaTypeIdApi(param, dispatch);
      }
    };
    getAllCinemaNamesByCinemaTypeId(searchByCinemaTypeId);
  }, [searchByCinemaTypeId, flag]);

  // theo locationId & CinemaTypeId
  useEffect(() => {
    const getAllCinemaNamesByCinemaTypeid = async (param1, param2) => {
      if (flag === 3) {
        await getAllCinemaNamesByLocationIdAndCinemaTypeIdApi(
          param1,
          param2,
          dispatch
        );
      }
    };
    getAllCinemaNamesByCinemaTypeid(searchByLocationId, searchByCinemaTypeId);
  }, [searchByLocationId, searchByCinemaTypeId, flag]);

  // lấy ra được cinemaName cụ thể
  const [dataCinemaName, setDataCinemaName] = useState();
  const handleClickCinemaName = (cinemaName) => {
    setDataCinemaName(cinemaName);
    const cinemaNameElements = document.querySelectorAll(".cinemaroom-left-info");
    cinemaNameElements.forEach((element) => {
      if(element.textContent === cinemaName.name){
         element.classList.add("active");
      }else{
        element.classList.remove("active");
      }
    })
  };


  // ================ thống kê theo rạp ============================
  const CinemaNameRef = useRef(null);
  const [cinemaNameByMonths, setcinemaNameByMonths] = useState();
  // get dashboard movie
  useEffect(() => {
    if(dataCinemaName){
      const getCinemaNameByMonth = async () => {
        const res = await axios.get(`${PK}/dashboard/cinemaNameId?cinemaNameId=${dataCinemaName?.id}`);
        if(res.data){
          setcinemaNameByMonths(res.data);
        }
      }
      getCinemaNameByMonth();
    }
  }, [dataCinemaName])
 
  // lưu lại mảng tên rạp 
  useEffect(() => {
    const ctx = CinemaNameRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line', // Loại biểu đồ (ví dụ: bar, line, pie)
      data: {
        labels: cinemaNameByMonths?.map(cinemaNameByMonth => cinemaNameByMonth.data.month),
        datasets: [{
          label: 'Vé được bán',
          data: cinemaNameByMonths?.map(cinemaNameByMonth => cinemaNameByMonth.data.count),
          backgroundColor: '#d82d8b',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false, // Vô hiệu hóa hiển thị tooltip khi hover
          },
          legend: {
            display: false, // Vô hiệu hóa hiển thị legend
          },
        },
        hover: {
          mode: null, // Vô hiệu hóa hiệu ứng mặc định khi hover
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    // Cập nhật biểu đồ sau khi dữ liệu thay đổi
    chart.update();
  }, [cinemaNameByMonths]);
  
  return (
    <div className='dashboard'>
      <div className="dashboard-movie">
        <h1>Thống kê theo phim</h1>
        <canvas ref={chartRef} />;
      </div>
      <div className="dashboard-cinemaName">
        <h1>Thống kê theo rạp</h1>
        <div className="buyticket-cinematype">
          <div className="cinemaroom-header">
            <div className="cinemaroom-location">
              <span>Vị trí</span>
              <select onChange={(e) => handleChangeSelectLocation(e)}>
                <option value="Default" selected disabled hidden>
                  TP.Hồ Chí Minh
                </option>
                {locations.map((item) => (
                  <option key={item.data?.id} value={item.data?.id}>
                    {item.data.province}
                  </option>
                ))}
              </select>
            </div>
            <div className="cinemaroom-types">
              <div className="cinemaroom-type" onClick={() => handleClickCinemaType({name: "Tất cả"})}>
                <img src={All} alt="" />
                <p>Tất cả</p>
              </div>
              {cinemaTypes.map((item) => (
                <div
                  key={item.data.id}
                  className="cinemaroom-type"
                  onClick={() => handleClickCinemaType(item.data)}
                >
                  <img src={item.data.logo || NoAvatar} alt="" />
                  <p>{item.data.name}</p>
                </div>
              ))}
              <div className="cinemaroom-header-add"></div>
            </div>
          </div>
          <div className="cinemaroom-content">
            <div className="cinemaroom-content-left">
              <div className="cinemaroom-left-header">
                <div className="cinemaroom-left-search">
                  <input type="text" placeholder="Tìm theo tên rạp ..." />
                  <SearchIcon />
                </div>
              </div>
              <div className="cinemaroom-left-infos">
                {flag === 1 || flag === 2 || flag === 3
                  ? cinemaNamesByConditions.map((item) => (
                      <div
                        key={item.data?.id}
                        className="cinemaroom-left-info"
                        onClick={() => handleClickCinemaName(item.data)}
                      >
                        <img src={item.data.logo || NoAvatar} alt="" />
                        <p>{item.data.name}</p>
                      </div>
                    ))
                  : cinemaNames.map((item) => (
                      <div
                        key={item.data?.id}
                        className="cinemaroom-left-info"
                        onClick={() => handleClickCinemaName(item.data)}
                      >
                        <img src={item.data.logo || NoAvatar} alt="" />
                        <p className="cinemaroom-left-addclass">
                          {item.data.name}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
            <div className="dashboard-right">
              <canvas ref={CinemaNameRef} />;       
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard