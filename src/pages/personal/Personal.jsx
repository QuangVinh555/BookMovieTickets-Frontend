import React from 'react';
import "./Personal.scss";
import NoAvatar from "../../assets/image/noAvatar.png";
import UserBig from "../../assets/image/UserBig.jpg";

const Personal = () => {
  return (
    <div className="personal">
        <div className="personal-2">
            <div className="personal-header">
              <div className="personal-header-left">
                <div className="personal-header-left-info">
                  <img className="personal-header-left-info-big" src={UserBig} alt="" />
                  <img className="personal-header-left-info-small" src={NoAvatar} alt="" />
                  <h2>Vinh võ</h2>
                </div>
              </div>
              <div className="personal-header-right">
                <div className="personal-header-right-point">
                  <div className="personal-right-point-milestones">
                    <h2>Điểm</h2>
                    <div className="personal-right-point-progress">
                      <div class="progress-bar__marker">
                        <p>Member</p>
                      </div>
                      <div class="progress-bar__marker">
                        <p>VIP</p>
                      </div>
                      <div class="progress-bar__marker">
                        <p>VVIP</p>
                      </div>
                    </div>
                  </div>
                  <div className="personal-right-point-data">
                    <div className="personal-right-point-total">
                      <h2>Tổng chi tiêu</h2>
                      <h2>1.000.000 VNĐ</h2>
                    </div>
                    <div className="personal-right-point-rewardpointed">
                      <h2>Điểm thưởng</h2>
                      <h2>50</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="personal-content">
              <div className="personal-content-header">
                <h1>Lịch sử thanh toán</h1>
              </div>
              <table className="userinfo-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ngày đặt vé</th>
                    <th scope="col">Phim</th>
                    <th scope="col">Rạp chiếu</th>
                    <th scope="col">Phòng chiếu</th>
                    <th scope="col">Ghế</th>
                    <th scope="col">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">123</th>
                    <td>20/10/2023</td>
                    <td>Lật Mặt 6</td>
                    <td>CGV Thủ Đức</td>
                    <td>Phòng chiếu 1</td>
                    <td>
                      <p>E7,E8</p>
                    </td>
                    <td>80.000VNĐ</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default Personal