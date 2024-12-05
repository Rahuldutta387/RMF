import React, { useState } from "react";
import axios from "axios";
import "./PostRoomPage.css";
import NavBarRMF from "./shared/NavBarRMF";
import ErrorDialog from "./shared/ErrorDialog.jsx";
const PostRoomPage = () => {
  var roomDetailsData = {
    address: {
      area: "",
      city: "",
      state: "",
    },
    requirement: {
      size: "",
      vacancy: 0,
      gender: "",
      message: "",
    },
    amount: 0,
    status: "vacant",
  };
  const [room, setRoom] = useState({});
  const [isError, setIsError] = useState(false);
  const setApiData = () => {
    roomDetailsData.name = room.name;
    roomDetailsData.address.area = room.area;
    roomDetailsData.address.city = room.city;
    roomDetailsData.address.state = room.state;
    roomDetailsData.requirement.size = room.size;
    roomDetailsData.requirement.vacancy = room.vacancy;
    roomDetailsData.requirement.gender = room.gender;
    roomDetailsData.requirement.message = room.message;
    roomDetailsData.amount = room.amount;
  };
  const handleCreateAccount = () => {
    setApiData();
    axios
      .post("/api/RoomMateFinder/createRoomDetails", roomDetailsData)
      .then((res) => {
        setIsError(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setStatefunction = (key, value) => {
    let updatedParams = { ...room };
    updatedParams[key] = value;
    setRoom(updatedParams);
  };
  const closeModal = () => {
    setIsError(false);
  };
  let ApiErrorMsg = isError && (
    <ErrorDialog
      open={isError}
      ErrorTxt={"Successfully Posted Room"}
      ErrorTitle={"Congrats"}
      handleDialogOk={closeModal}
    />
  );
  return (
    <>
      {ApiErrorMsg}
      <NavBarRMF></NavBarRMF>
      <div className="content">
        <h2>Create Room Details</h2>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Name"
            value={room.name}
            onChange={(e) => setStatefunction("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Area"
            value={room.area}
            onChange={(e) => setStatefunction("area", e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={room.city}
            onChange={(e) => setStatefunction("city", e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={room.state}
            onChange={(e) => setStatefunction("state", e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Size"
            value={room.size}
            onChange={(e) => setStatefunction("size", e.target.value)}
          />
          <input
            type="text"
            placeholder="Number of People for sharing"
            value={room.vacancy}
            onChange={(e) => setStatefunction("vacancy", e.target.value)}
          />
          <input
            type="text"
            placeholder="Targeted Gender"
            value={room.gender}
            onChange={(e) => setStatefunction("gender", e.target.value)}
          />
          <input
            type="text"
            placeholder="Room mate specification"
            value={room.message}
            onChange={(e) => setStatefunction("message", e.target.value)}
          />
          <input
            type="text"
            placeholder="Total Rent"
            value={room.amount}
            onChange={(e) => setStatefunction("amount", e.target.value)}
          />

          <button onClick={handleCreateAccount}>Post your Room Details</button>
        </div>
      </div>
    </>
  );
};

export default PostRoomPage;
