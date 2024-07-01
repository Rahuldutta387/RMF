import React, { useState } from "react";
import "./LoginPage.css";
import MyImage from "./images/loginImage.jpeg";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const handleButtonClick = () => {
    let errorTxt = checkLoginDetails();
    if (errorTxt !== "") return;
    axios
      .get("/user/login?Email=" + email + "&Password=" + password + "")
      .then((response) => {
        history.push("/" + response.data.userType);

        console.log(response);
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };
  const handleSignin = () => {
    history.push("/Signin");
  };
  const checkLoginDetails = () => {
    let updatedErrorMsg = "";
    if (email === "") {
      updatedErrorMsg += "Email FIELD IS MISSING!!";
    } else {
      if (password === "") {
        updatedErrorMsg += "Password FIELD IS MISSING!!";
      }
    }
    setErrorMsg(updatedErrorMsg);
    return updatedErrorMsg;
  };
  const closeModal = () => {
    setIsError(false);
  };

  console.log(isError);
  let ApiErrorMsg = isError && (
    <ErrorDialog
      open={isError}
      ErrorTxt={
        "this Email Id already exists in database.Please use a different Email Id"
      }
      ErrorTitle={"Error while Logging in!"}
      handleDialogOk={closeModal}
    />
  );
  return (
    <>
      {ApiErrorMsg}

      <div className="header">Welcome To Roommate Finder</div>
      <div className="content">
        <div className="loginDetails">
          <div className="emailDetails">
            <label className="formLabel">Email Id : </label>
            <input
              type="text"
              className="formPlaceHolder"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="passwordDetails">
            <label className="formLabel">Password : </label>
            <input
              type="password"
              className="formPlaceHolder"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="errorMsg">{ErrorMsg}</div>
          <div className="loginButton">
            <Button variant="contained" onClick={handleButtonClick}>
              Login
            </Button>
          </div>
          <br></br>
          <div>Forgot Password?</div>
          <br></br>
          <div>
            {"Don't have an account? "}
            <span className="signinlink" onClick={handleSignin}>
              Sign In
            </span>
          </div>
        </div>
        <img className="loginPageImage" src={MyImage} alt=""></img>
      </div>
    </>
  );
};

export default LoginPage;
