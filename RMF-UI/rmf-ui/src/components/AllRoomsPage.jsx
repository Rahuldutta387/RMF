import React, { useEffect, useState } from "react";
import NavBarRMF from "./shared/NavBarRMF";
import "./AllRoomPage.css";
import axios from "axios";
import Button from "@mui/material/Button";

const AllRoomsPage = () => {
  var tryVal = 0;
  const [roomList, setRoomList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(true);
  function getRoomList() {
    axios
      .get("/api/RoomMateFinder/getRoomDetails?skip=" + skip + "&limit=10")
      .then((res) => {
        if (skip > 0) {
          setIsPrev(false);
        }
        if (skip <= 0) {
          setIsPrev(true);
        }

        setIsNext(!res.data.isNext);
        setRoomList(res.data.roomDetails);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getRoomList();
  }, [skip]);
  const handNextButton = () => {
    setSkip((skip) => skip + 10);
  };
  const handlePrevButton = () => {
    setSkip((skip) => skip - 10);
  };
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
      <div className="buttonGroup">
        <Button
          variant="contained"
          onClick={handlePrevButton}
          disabled={isPrev}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={handNextButton} disabled={isNext}>
          Next
        </Button>
      </div>
    </>
  );
};

export default AllRoomsPage;
