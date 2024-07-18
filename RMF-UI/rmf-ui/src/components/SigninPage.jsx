import React, { useState } from "react";
import "./LoginPage.css";
import "./SigninPage.css";
import MyImage from "./images/loginImage.jpeg";
import Button from "@mui/material/Button";
import axios from "axios";
import ErrorDialog from "./shared/ErrorDialog";
import Loader from "./shared/Loader";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isError, setIsError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [params, setParams] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const signInDetails = {
    name: "required",
    email: "required",
    password: "required",
    type: "required",
  };

  var signinDetails = {
    Name: "",
    Email: "",
    Password: "",
    UserType: "",
  };
  const handleButtonClick = () => {
    let errorTxt = checkSigninDetails();
    if (errorTxt !== "") return;
    setIsLoader(true);
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
        setIsLoader(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoader(false);
        console.log(error);
      });
  };

  const closeModal = () => {
    setIsError(false);
  };

  let ApiErrorMsg = isError && (
    <ErrorDialog
      open={isError}
      ErrorTxt={
        "this Email Id already exists in database.Please use a different Email Id"
      }
      ErrorTitle={"Error while Signing in!"}
      handleDialogOk={closeModal}
    />
  );

  const checkSigninDetails = () => {
    let updatedErrorMsg = "";
    Object.keys(signInDetails).forEach((key) => {
      if (
        signInDetails[key] === "required" &&
        (params[key] === "" || params[key] === undefined)
      ) {
        updatedErrorMsg += `${key} FIELD IS MISSING!!`;
      }
    });

    setErrorMsg(updatedErrorMsg);
    return updatedErrorMsg;
  };

  function setPlaceholderValue(value, parameter) {
    let updatedParams = { ...params };
    updatedParams[parameter] = value;
    setParams(updatedParams);
  }

  let loader = <Loader></Loader>;
  return (
    <>
      {isLoader ? (
        loader
      ) : (
        <>
          {ApiErrorMsg}
          <div className="rmf-icon">
            <span className="rmf">RMF</span>
            <span className="login">Sign In</span>
          </div>
          <div className="header">Welcome To Roommate Finder</div>
          <div className="content">
            <div className="loginDetails">
              <div className="nameDetails">
                <label className="formLabel">Name : </label>
                <input
                  type="text"
                  className="formPlaceHolder"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setPlaceholderValue(e.target.value, "name");
                  }}
                ></input>
              </div>
              <div className="emailDetails">
                <label className="formLabel">Email Id : </label>
                <input
                  type="text"
                  className="formPlaceHolder"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setPlaceholderValue(e.target.value, "email");
                  }}
                ></input>
              </div>
              <div className="passwordDetails">
                <label className="formLabel">Password : </label>
                <input
                  type="password"
                  className="formPlaceHolder"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPlaceholderValue(e.target.value, "password");
                  }}
                ></input>
              </div>
              <div className="userTypeDetails">
                <label className="formLabel">Type : </label>
                <input
                  type="text"
                  className="formPlaceHolder"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPlaceholderValue(e.target.value, "type");
                  }}
                ></input>
              </div>
              <div className="errorMsg">{ErrorMsg}</div>
              <div className="loginButton">
                <Button variant="contained" onClick={handleButtonClick}>
                  Signin
                </Button>
              </div>
            </div>
            <img className="loginPageImage" src={MyImage} alt=""></img>
          </div>
        </>
      )}
    </>
  );
};

export default SigninPage;
