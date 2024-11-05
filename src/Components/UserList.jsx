import React, { useEffect, useState } from "react";
import "./user.css";
import { json, Link } from "react-router-dom";

function UserList() {
  const [userData, setUserData] = useState([
    { id: "", name: "", phoneNumber: "", email: "", companyName: "" },
  ]);
  const [newUserData, setNewUserdata] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    companyName: "",
  });
  const [isAddmodal, setIsAddModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [mailError, setMailError] = useState("");
  const [validMail, setValidMail] = useState("");

  async function users() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();

      
      const listUser = users.map((user) => ({
        id: user.id,
        name: user.name,
        phoneNumber: user.phone,
        email: user.email,
        companyName: user.company.name,
      }));
      localStorage.setItem("userlist", JSON.stringify(listUser));
    } catch (error) {
      console.log("API Fetch is not properly done:");
    }
  }

  function handleUsers(users) {
    const stringObject = JSON.stringify(users);
    localStorage.setItem("users", stringObject);
  }

  function handleModal(e) {
    if (e.target.name === "name") {
      setNewUserdata({ ...newUserData, name: e.target.value.slice(0, 20) });
    } else if (e.target.name === "phoneNumber") {
      setNewUserdata({
        ...newUserData,
        phoneNumber: e.target.value.slice(0, 10),
      });
    } else if (e.target.name === "email") {
      setNewUserdata({ ...newUserData, email: e.target.value.slice(0, 30) });
    } else if (e.target.name === "companyName") {
      setNewUserdata({
        ...newUserData,
        companyName: e.target.value.slice(0, 20),
      });
    }
  }

  async function handleAdd(user) {
    setIsAdd(false);
    const newUser = {
      id: userData.length + 1,
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      companyName: user.companyName,
    };

    let updatedUserData = [...userData, newUser];
    setUserData(updatedUserData);

    localStorage.setItem("userlist", JSON.stringify(updatedUserData));

    setNewUserdata({
      id: "",
      name: "",
      phoneNumber: "",
      email: "",
      companyName: "",
    });

    setIsAddModal(false);
  }
  
  function mailValidation(email) {
    let countOfAt = 0;
    let allowedSpecialChar = "._";
    let isError = false;
    let space = " ";
    let specialChar = "`~!#$%^&*()-+=[]{}><?/,|;:";
    for (let i = 0; i < email.length; i++) {
      let isspecial = false;
      if (email[i] === "@") {
        countOfAt++;
      }
      for (let k = 0; k < space.length; k++) {
        if (email[i] === space[k]) {
          isError = true;
          setValidMail("");
          setMailError("Space is not allowed in mail address");
        }
      }
      if (!isError) {
        for (let j = 0; j < specialChar.length; j++) {
          if (email[i] === specialChar[j]) {
            isError = true;
            setValidMail("");
            setMailError(
              "Given " +
                specialChar[j] +
                " character is not allowed in the mail address"
            );
          }
        }
      }
      if (!isError) {
        for (let j = 0; j < allowedSpecialChar.length; j++) {
          if (email[i] === allowedSpecialChar[j]) {
            isspecial = true;
          }
        }
      }
      if (isspecial) {
        for (let j = 0; j < allowedSpecialChar.length; j++) {
          if (allowedSpecialChar[j] === email[i + 1]) {
            isError = true;
            setValidMail("");
            setMailError(
              allowedSpecialChar +
                " should not appear consecutive in mail address"
            );
          }
        }
      }
    }
    if (countOfAt == 1 && !isError) {
      let emailPart = email.split("@");

      if (emailPart[0].length <= 65 && emailPart[1].length <= 255) {
        for (let i = 0; i < emailPart[0].length; i++) {
          if (
            emailPart[0][0] === allowedSpecialChar[i] ||
            emailPart[0][[emailPart[0].length - 1]] === allowedSpecialChar[i]
          ) {
            setValidMail("");
            setMailError(
              allowedSpecialChar[i] +
                " is not allowed at first and last character of mail address"
            );
            isError = true;
          }
        }
        let topDomain = emailPart[1].split(".");
        let topDomainContent = ["com", "in", "edu", "gov", "net", "org"];
        if (!isError) {
          for (let i = 0; i < topDomainContent.length; i++) {
            if (topDomain[topDomain.length - 1] === topDomainContent[i]) {
              isError = true;
              setMailError("");
              setValidMail(email);
            }
          }
          if (!isError) {
            setValidMail("");
            setMailError(
              "." +
                topDomain[topDomain.length - 1] +
                " is not valid in mail address"
            );
          }
        }
      } else {
        setValidMail("");
        setMailError("Given mail address length is not valid");
      }
    } else if (countOfAt > 1) {
      setValidMail("");
      setMailError("only one @ is allowed in mail address");
    }
  }

  useEffect(() => {
    if (newUserData.email !== "") {
      mailValidation(newUserData.email);
    }
  }, [newUserData]);

  useEffect(() => {
      users();
      const userDetailsData = localStorage.getItem("userlist");
      const userDisplay = JSON.parse(userDetailsData);
      setUserData(userDisplay);
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Userdetails</h1>
      </div>
      <div className="userList">
        <table>
          <tbody>
            <tr>
              <th
                style={{
                  width: "100px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                UserId
              </th>
              <th
                style={{
                  width: "200px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Name
              </th>
              <th
                style={{
                  width: "100px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                View
              </th>
            </tr>
            {userData.map((val, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {val.id}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {val.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link
                    to={`/user/${index + 1}`}
                    onClick={() => {
                      handleUsers(val);
                    }}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            <tr>
              <th colSpan={3}>
                <button
                  onClick={() => {
                    setIsAddModal(true);
                  }}
                >
                  Add
                </button>
              </th>{" "}
            </tr>
          </tbody>
        </table>

        {isAddmodal && (
          <div className="addModal">
            <div className="closebutton">
              <div className="addheader">
                <h3>AddUser</h3>
              </div>
              <button
                className="close-btn"
                onClick={() => {
                  setIsAddModal(false);
                  setNewUserdata({
                    id: "",
                    name: "",
                    phoneNumber: "",
                    email: "",
                    companyName: "",
                  });
                }}
              >
                <ion-icon name="close"></ion-icon>
              </button>
            </div>

            <div
              className="name"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Enter the name:</label>
              <input
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleModal}
              />
              {isAdd && newUserData.name === "" && (
                <div
                  style={{ color: "red", fontSize: "12px", fontWeight: "500" }}
                >
                  Please enter the name
                </div>
              )}
            </div>
            <div
              className="phoneNumber"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Enter the mobile Number:</label>
              <input
                type="number"
                name="phoneNumber"
                value={newUserData.phoneNumber}
                onChange={handleModal}
              />
              {isAdd && newUserData.phoneNumber === "" && (
                <div
                  style={{ color: "red", fontSize: "12px", fontWeight: "500" }}
                >
                  Please enter the mobile number
                </div>
              )}
              {isAdd &&
                newUserData.phoneNumber.length > 0 &&
                newUserData.phoneNumber.length < 10 && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    Please enter 10 digit mobile number
                  </div>
                )}
            </div>
            <div
              className="email"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Enter the mail:</label>
              <input
                type="text"
                name="email"
                value={newUserData.email}
                onChange={handleModal}
              />
              {isAdd && newUserData.email === "" && (
                <div
                  style={{ color: "red", fontSize: "12px", fontWeight: "500" }}
                >
                  Please enter the mailid
                </div>
              )}
              {isAdd && newUserData.email !== "" && mailError !== "" && (
                <div
                  style={{ color: "red", fontSize: "12px", fontWeight: "500" }}
                >
                  {mailError}
                </div>
              )}
            </div>
            <div
              className="CompanyName"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Enter the Compay Name:</label>
              <input
                type="text"
                name="companyName"
                value={newUserData.companyName}
                onChange={handleModal}
              />
              {isAdd && newUserData.companyName === "" && (
                <div
                  style={{ color: "red", fontSize: "12px", fontWeight: "500" }}
                >
                  Please enter the Company Name
                </div>
              )}
            </div>
            <div
              className="functionbtn"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => {
                  setIsAdd(true);
                  isAddmodal &&
                    newUserData.name !== "" &&
                    newUserData.phoneNumber !== "" &&
                    newUserData.email !== "" &&
                    newUserData.companyName !== "" &&
                    validMail &&
                    handleAdd(newUserData);
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddModal(false);
                  setNewUserdata({
                    id: "",
                    name: "",
                    phoneNumber: "",
                    email: "",
                    companyName: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
