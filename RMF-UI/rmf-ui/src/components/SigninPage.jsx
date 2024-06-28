import React, { useState } from "react";
import "./LoginPage.css";
import MyImage from "./images/loginImage.jpeg";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const history = useHistory();
  var signinDetails = {
    Name: "",
    Email: "",
    Password: "",
    UserType: "",
  };
  const handleButtonClick = () => {
    signinDetails.Name = name;
    signinDetails.Password = password;
    signinDetails.Email = email;
    signinDetails.UserType = type;
    axios
      .post(
        "user/signUp?Name=" +
          signinDetails.Name +
          "&Email=" +
          signinDetails.Email +
          "&Password=" +
          signinDetails.Password +
          "&UserType=" +
          signinDetails.UserType +
          ""
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="rmf-icon">
        <span className="rmf">RMF</span>
        <span className="login">Sign In</span>
      </div>
      <div className="header">Welcome To Roommate Finder</div>
      <div className="content">
        <div className="loginDetails">
          <div className="nameDetails">
            <label className="formLabel">Name</label>
            <input
              type="text"
              className="formPlaceHolder"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="emailDetails">
            <label className="formLabel">Email Id</label>
            <input
              type="text"
              className="formPlaceHolder"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="passwordDetails">
            <label className="formLabel">Password</label>
            <input
              type="password"
              className="formPlaceHolder"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="userTypeDetails">
            <label className="formLabel">Type</label>
            <input
              type="text"
              className="formPlaceHolder"
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></input>
          </div>
          <div className="loginButton">
            <Button variant="contained" onClick={handleButtonClick}>
              Signin
            </Button>
          </div>
        </div>
        <img className="loginPageImage" src={MyImage} alt=""></img>
      </div>
    </>
  );
};

export default SigninPage;
