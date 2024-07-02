import axios from "axios";
import React, { useEffect, useState } from "react";
import "./adminPage.css";
import Loader from "../components/shared/Loader.jsx";
const AdminPage = () => {
  const [details, setDetails] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  function getEmail() {
    setIsLoader(true);
    axios
      .get("/user/getEmail")
      .then((res) => {
        setDetails(res.data);
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);
      });
  }
  useEffect(() => {
    getEmail();
  }, []);
  function handleDeleteButtonClick(email) {
    setIsLoader(true);
    axios
      .delete("user/delete?email=" + email)
      .then((res) => {
        setIsLoader(false);
        getEmail();
      })
      .catch((res) => {});
  }
  let loader = (
    <>
      <Loader></Loader>
    </>
  );
  return (
    <>
      {isLoader ? (
        loader
      ) : (
        <table className="my-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>UserType</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <tr key={detail.name}>
                <td>{detail.name}</td>
                <td>{detail.email}</td>
                <td>{detail.userType}</td>
                <td>
                  <button onClick={() => handleDeleteButtonClick(detail.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminPage;
