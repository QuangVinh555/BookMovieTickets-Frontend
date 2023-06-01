import React from 'react';
import "./ChairStatus.scss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEffect } from 'react';
import { getAllChairStatusByCinemaRoomIdApi } from '../../redux/chairStatus/ChairStatusApi';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { createBookTicketDetailApi, deleteBookTicketDetailByCancelChairApi, deleteBookTicketDetailByStateApi } from '../../redux/bookTicketDetail/BookTicketDetailApi';
import { ToastContainer, toast } from 'react-toastify';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { getAllComboByDateNowApi } from '../../redux/combo/ComboApi';

const ChairStatus = (props) => {
    const {hourTime, openChairStatus, setOpenChairStatus, showTime, dateShowTime} = props; 
  
    const dispatch = useDispatch();
    const listChairStatus = useSelector(state => state.chairStatus.listChairStatus);
    const bookTicket = useSelector(state => state.bookTicket.bookTicket);
    const combos = useSelector(state => state.combo.combos);

    let formattedDate = new Date(dateShowTime).toLocaleDateString('en-GB');

    // get all chairStatus by HourTimeId
    useEffect(() => {
        const getAllChairStatusByCinemaRoom = async (hourTime) => {
            await getAllChairStatusByCinemaRoomIdApi(hourTime.id, dispatch)
        }
        getAllChairStatusByCinemaRoom(hourTime);
    }, [hourTime])

    // thoát khỏi màn hình chọn ghế
    const hadndleBack = async () => {
        setOpenChairStatus(false);
    }
    
    useEffect(() => {
            const setChariStatus = async () => {
                await deleteBookTicketDetailByStateApi(bookTicket?.data.id, hourTime.id, dispatch)
            }
            setChariStatus();
    }, [!openChairStatus])

    // tránh nỗi bọt
    const handlePropagation = (e) => {
        e.stopPropagation();
    }

    // chọn ghế
    const [dataChair, setDataChair] = useState();
    const [isLoadChair, setIsLoadChair] = useState(false);
   
    // khi nào chọn ghế, thì các ghế được chọn sẽ được thêm vào mảng này
    const [selectedChairs, setSelectedChairs] = useState([]);
    const handleSelectedChair = async(event,chair) => {
        setIsLoadChair(true);
        if(chair.status === 2){
            event.stopPropagation();
            event.preventDefault();
        }else{
            const newBookTicketDetail = {
                BookTicketId: bookTicket.data.id,
                ChairId: chair.chairId,
                TicketPrice: showTime.ticketPrice,
                HourTimeId: hourTime.id,
            }
            setDataChair(chair);
            const index = selectedChairs.indexOf(chair.chair);
    
            if (index > -1) {
              // Ghế đã được chọn trước đó, bỏ chọn ghế
              setSelectedChairs(prevSelectedChairs => prevSelectedChairs.filter(selectedChair => selectedChair !== chair.chair));
              await deleteBookTicketDetailByCancelChairApi(chair.id, bookTicket.data.id, dispatch);
            } else {
              // Ghế chưa được chọn, thêm ghế vào danh sách các ghế đã chọn
              setSelectedChairs(prevSelectedChairs => [...prevSelectedChairs, chair.chair]);
              await createBookTicketDetailApi(newBookTicketDetail, dispatch)
            }
        }
        
    }
    

    // thay đổi màu khi chọn ghế
    useEffect(() => {
        var chairElements = document.querySelectorAll('.chairstatus-chair');
        chairElements.forEach(item => {
          const chair = item.textContent;
          if (selectedChairs.includes(chair)) {
            item.classList.add('btnSelected');
          } else {
            item.classList.remove('btnSelected');
          }
        });
      }, [selectedChairs]);

    //   tự động set lại các ghế chưa thanh toán sau 2 phút
    useEffect(() => {
        if(isLoadChair === true){
            const interval = setInterval(async () => {
              await deleteBookTicketDetailByStateApi(bookTicket.data.id, hourTime.id, dispatch)
              setOpenChairStatus(false)
              setIsLoadChair(false);
              toast.info(
                "Quá trình chọn ghế hết thời gian. Vui lòng chọn ghế lại !",
                {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                }      
              );  
            }, 2 * 60 * 1000); // 2 phút = 2 * 60 * 1000 miligiây
            return () => {
                // Xóa interval khi component bị unmount hoặc effect bị clean up
                clearInterval(interval);
            };
        }
      }, [isLoadChair])
      
    //   hủy ghế chỗ thông tin chỗ ngồi
      const handleCancelChair = async () => {
        await deleteBookTicketDetailByStateApi(bookTicket?.data.id, hourTime.id, dispatch)
        var chairElements = document.querySelectorAll('.chairstatus-chair');
        chairElements.forEach(item => {
          const chair = item.textContent;
          if (selectedChairs.includes(chair)) {
            item.classList.remove('btnSelected');
            setSelectedChairs([]);
        }
        });
      }

    //   duyệt qua mảng các ghế đã được chọn để lấy số lượng tính tổng tiền tạm tính
      const [totalTicket, setTotalTicket] = useState(0);
      useEffect(() => {
        let total = 0;
        selectedChairs.forEach(item => {
            total++;
        });
        setTotalTicket(total * showTime.ticketPrice);
      }, [dataChair, selectedChairs])

    //   format VNĐ
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(totalTicket);


    // biến lưu trữ combo
    const [isOpenCombo, setIsOpenCombo] = useState(false);
    // mua vé
    const handleBuyTicket = () => {
        setIsOpenCombo(true);
        // if(selectedChairs.length === 0){
        //     toast.info(
        //         "Vui lòng chọn ít nhất 1 ghế!",
        //         {
        //           position: toast.POSITION.TOP_RIGHT,
        //           autoClose: 2000,
        //         }      
        //       );  
        // }else{
        //     setIsOpenCombo(true);
        // }
    }

    // =========== Combo ==========
   
    useEffect(() => {
      const getAllComboByDateNow = async () => {
          await getAllComboByDateNowApi(dispatch);
      }
      getAllComboByDateNow();
  }, [])
     
     // tắt form combo
     const handleBackCombo = () => {
         setIsOpenCombo(false);
     }
   
     // biến lưu trữ số lượng combo
     const [numCombo, setNumCombo] = useState(0);
     const [dataNumCombo, setDataNumCombo] = useState();
     // giảm số lượng
     const handleMinusCombo = (combo) => {
        setDataNumCombo(combo)
        combos.map(item =>{
            if(item.data.id === combo.id){
                setNumCombo(numCombo <= 0 ? 0 : (numCombo - 1));
            }
        })
     }
   
     // tăng số lượng
     const handleAddCombo = (combo) => {
        setDataNumCombo(combo)
        combos.forEach(item => {
            if(item.data.id === combo.id) {
                setNumCombo(numCombo + 1);
            }
        })
     }
  
    //  tính tổng tiền combo
     const [totalCombo, setTotalCombo] = useState(0);
     useEffect(() => {
        setTotalCombo(numCombo * (dataNumCombo?.price));
     }, [numCombo])

    // format VNĐ combo
    const formattedAmountCombo = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(totalCombo);

    // ======== Ticket Detail ========
    const [isOpenTicketDetail, setIsOpenTicketDetail] = useState(false);
    const handleTicketDetail = () => {
        setIsOpenTicketDetail(true);
    }

  return (
   <>
        {/* open chair status  */}
        <div className="chairstatus" onClick={() => setOpenChairStatus(false)}>
            <div className="chairstatus-2" onClick={(e) => handlePropagation(e)}>
                <div className="chairstatus-header">
                    <KeyboardArrowLeftIcon onClick={() => hadndleBack()} />
                    <h1>Mua vé xem phim</h1>
                </div>
                <div className="chairstatus-container">
                    <div className="chairstatus-screen">
                        <div className="chairstatus-line"></div>
                        <p>Màn hình</p>
                    </div>
                    <div className="chairstatus-list">
                        {
                            listChairStatus.map(chairStatus => (
                                <div key={chairStatus.data.id} className="chairstatus-item">
                                    <button
                                        onClick={(e) => handleSelectedChair(e,chairStatus.data)}
                                        className={`
                                            chairstatus-chair
                                            ${chairStatus.data.status === 1 && 'btnSelected' ||
                                            chairStatus.data.status === 2 && 'btnSelectedBuy' ||
                                            chairStatus.data.chairTypeId === 1 && 'btnNormal' || 
                                            chairStatus.data.chairTypeId === 2 && 'btnVIP' || 
                                            chairStatus.data.chairTypeId === 3 && 'btnCouple'
                                            }`
                                        }                               
                                    >
                                        {chairStatus.data.chair}</button>
                                </div>
    
                            ))
                        }                   
                    </div>
                    <div className="chairstatus-state">
                       <div className="chairstatus-state-1">
                            <div className="chairstatus-state-item">
                                <div className="chairstatus-square btnSelectedBuy"></div>
                                <p>Đã đặt</p>
                            </div>
                            <div className="chairstatus-state-item">
                                <div className="chairstatus-square btnSelected"></div>
                                <p>Ghế bạn chọn</p>
                            </div>
    
                       </div>
                        <div className="chairstatus-state-2">
                            <div className="chairstatus-state-item">
                                <div className="chairstatus-square btnNormal"></div>
                                <p>Ghế thường</p>
                            </div>
                            <div className="chairstatus-state-item ">
                                <div className="chairstatus-square btnVIP"></div>
                                <p>Ghế VIP</p>
                            </div>
                            <div className="chairstatus-state-item">
                                <div className="chairstatus-square btnCouple" ></div>
                                <p>Ghế đôi</p>
                            </div>
                        </div>
                    </div>
                    <div className="chairstatus-info">
                        <div className="chairstatus-info-title">
                            <p 
                             className={`
                             ${showTime.stamp === "P" && 'green' || 
                             showTime.stamp === "13+" && 'yellow' || 
                             showTime.stamp === "16+" && 'orange' || 
                             showTime.stamp === "18+" && 'red'}  `}
                            >{showTime.stamp}</p>
                            <h2>{showTime.name}</h2>
                        </div>
                        <div className="chairstatus-info-date">
                            <span>{hourTime.time} ~ {hourTime.endTime} - </span>
                            <span>{formattedDate} - </span>
                            <span>{hourTime.cinemaRoom}</span>
                        </div>
                        <div className="chairstatus-chairdown">
                            <p>Chỗ ngồi</p>
                            <div className="chairstatus-chairname">
                                {
                                    selectedChairs.length !== 0 &&
                                    <button>
                                        {
                                            selectedChairs.map((chair,index) => (
                                                <>
                                                    {index === selectedChairs.length - 1 ? chair : chair + ", "}
                                                </>
                                            ))
                                        }
                                        <CancelIcon onClick = {() => handleCancelChair()}/>                    
                                    </button>
    
                                }
                               
                            </div>
                        </div>
                        <div className="chairstatus-temp">
                            <div className="chairstatus-temp-price">
                                <p>Tạm tính</p>
                                <p>{formattedAmount}</p>
                            </div>
                            <div className="chairstatus-buy">
                                <button onClick={() => handleBuyTicket()}>Mua vé</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>

        {/* open form combo */}
        {isOpenCombo && (
                        <div className="combo" onClick={() => setIsOpenCombo(false)}>
                            <div className="combo-2" onClick={(e) => handlePropagation(e)}>
                                <div className="combo-header">
                                    <KeyboardArrowLeftIcon onClick={() => handleBackCombo()} />
                                    <h1>Combo - Bắp nước</h1>
                                </div>
                                <div className="combo-container">
                                    <div className="combo-list">
                                        {
                                            combos.map(combo => (
                                                <div className="combo-item">
                                                    <div className="combo-item-img">
                                                        <img src="https://i.imgur.com/VNvOxmh.png" alt="" />
                                                    </div>
                                                    <div className="combo-item-info">
                                                        <h1>{combo.data.name}</h1>
                                                        <p>{combo.data.description} - {combo.data.price}</p>
                                                        <div className="combo-item-quantity">
                                                            <RemoveCircleOutlineIcon 
                                                                className={`combo-item-minus ${(combo.data.id === dataNumCombo?.id && numCombo <= 0) ? 'disabled' : 'active'}`}
                                                                onClick={() => handleMinusCombo(combo.data)}
                                                            />
                                                            <p>{combo.data.id === dataNumCombo?.id ?  numCombo : 0}</p>
                                                            <ControlPointIcon 
                                                                className='combo-item-add' 
                                                                onClick={() => handleAddCombo(combo.data)}
                                                            />
                                                            <h3 className="combo-item-num">SL: {combo.data.count}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>                           
                                </div>
                                <div className="combo-footer">
                                    <div className="combo-price">
                                        <h2 className='combo-total'>Tổng cộng</h2>
                                        <h2>{formattedAmountCombo}</h2>
                                    </div>
                                    <div className="combo-btn">
                                        <button onClick={() => handleTicketDetail()}>Tiếp tục</button>
                                    </div>
                                </div>
                            </div>
                        </div>
        )}
        <ToastContainer />
   </>
  )
}

export default ChairStatus