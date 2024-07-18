import React from "react";
import "./RMFPage.css"; // Import the CSS file
import NavBarRMF from "./shared/NavBarRMF";

const ContentComponent = () => {
  return (
    <>
      <NavBarRMF></NavBarRMF>
      <div className="mainPageTextContent">
        Welcome to Room Mate Finder! We are pleased to find you your perfect
        Roommate
      </div>
    </>
  );
};

export default ContentComponent;
