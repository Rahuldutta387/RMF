import React, { useState } from "react";
import "./LoginPage.css";
import MyImage from "./images/loginImage.jpeg";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleButtonClick = () => {
    axios
      .get("/user/login?Email=" + email + "&Password=" + password + "")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignin = () => {
    history.push("/Signin");
  };
  return (
    <>
      <div className="header">Welcome To Roommate Finder</div>
      <div className="content">
        <div className="loginDetails">
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
              type="text"
              className="formPlaceHolder"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="loginButton">
            <Button variant="contained" onClick={handleButtonClick}>
              Login
            </Button>
          </div>
          <div className="signinlink" onClick={handleSignin}>
            Sign In
          </div>
        </div>
        <img className="loginPageImage" src={MyImage} alt=""></img>
      </div>
    </>
  );
};

export default LoginPage;
