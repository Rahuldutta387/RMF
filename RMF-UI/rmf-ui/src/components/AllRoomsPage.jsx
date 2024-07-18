import React, { useEffect, useState } from "react";
import NavBarRMF from "./shared/NavBarRMF";
import "./AllRoomPage.css";
import axios from "axios";

const AllRoomsPage = () => {
  const [roomList, setRoomList] = useState([]);
  function getRoomList() {
    axios
      .get("/api/RoomMateFinder/getRoomDetails")
      .then((res) => {
        setRoomList(res.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getRoomList();
  }, []);
  return (
    <>
      <NavBarRMF></NavBarRMF>
      <div className="mainContainer">
        {roomList.map((res) => (
          <div className="user-profile-card">
            <div className="avatar-section">
              {/* Avatar image would go here */}
              <div className="avatar-placeholder"></div>
            </div>
            <div className="user-info">
              <h2>{res.name}</h2>
              <p>
                {res.address.area}, {res.address.city}, {res.address.state}
              </p>
            </div>
            <div className="user-details">
              <div className="detail rent">Rent ₹ {res.amount}</div>
              <div className="detail looking-for">
                Looking for {res.requirement.gender}
              </div>
              <div className="detail flat-size">
                {res.requirement.size} Flat
              </div>
            </div>
            <p className="message">{res.requirement.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllRoomsPage;
