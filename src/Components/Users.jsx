import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Users() {

  const navigate = useNavigate();
  function handleBackBtn() {
    navigate("/");
  }

  let user = JSON.parse(localStorage.getItem("users"));
  console.log("users",user);

  function handleDeleteBtn() {
    localStorage.removeItem("users")
  }

  return (
    <div className="Usertable">
      {user && (
        <table>
          <tbody>
            <tr>
              <th colSpan={"2"}>userDetails</th>
            </tr>
            <tr>
              <td>UserId</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>PhoneNumber</td>
              <td>{user.phoneNumber}</td>
            </tr>
          
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>company</td>
              <td>{user.companyName}</td>
            </tr>
          
           
            <tr style={{ textAlign: "center", width: "100%" }}>
              <td >
                <button onClick={handleBackBtn}>Back</button>
              </td>
              <td>
                <button onClick={handleDeleteBtn}>Delete</button>
                </td>
            </tr>
           
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
