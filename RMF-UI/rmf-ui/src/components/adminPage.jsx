import axios from "axios";
import React, { useEffect, useState } from "react";
import "./adminPage.css";
const AdminPage = () => {
  const [details, setDetails] = useState([]);
  function getEmail() {
    axios
      .get("/user/getEmail")
      .then((res) => {
        setDetails(res.data);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getEmail();
  }, []);
  function handleDeleteButtonClick(email) {
    axios
      .delete("user/delete?email=" + email)
      .then((res) => {
        getEmail();
      })
      .catch((res) => {});
  }
  return (
    <>
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
    </>
  );
};

export default AdminPage;
