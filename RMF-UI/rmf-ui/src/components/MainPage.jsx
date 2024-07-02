import React from "react";
import LoginPage from "./LoginPage";

export const MainPage = () => {
  return (
    <>
      <div className="rmf-icon">
        <span className="rmf">RMF</span>
        <span className="login">Login</span>
      </div>
      <LoginPage></LoginPage>
    </>
  );
};
