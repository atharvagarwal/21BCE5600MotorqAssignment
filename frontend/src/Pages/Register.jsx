import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate=useNavigate()
  const [formData, setformData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/register", formData)
      .then(function (response) {
        alert("Register Successfully");
        navigate('/login')
    })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <>
      <div
        className="flex items-center justify-around"
      >
        <form className="w-full max-w-lg flex justify-center p-6 flex-col" onSubmit={submitHandler}>
          <h1 className="text-3xl p-6 font-bold text-center">Register</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="email"
                placeholder="xyz@gmail.com"
                onChange={(e) => {
                  let email = { email: e.target.value };
                  setformData({ ...formData, ...email });
                }}
                required
              />
            </div>
          
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="Enter a strong password"
                onChange={(e) => {
                    let password = { password: e.target.value };
                    setformData({ ...formData, ...password});
                }}
                required
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                role
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="admin/requester/approver"
                onChange={(e) => {
                    let role = { role: e.target.value };
                    setformData({ ...formData, ...role});
                }}
                required
              />
            </div>
          </div>
          <center>
           
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-1/2"
              type="submit"
            >
              Submit
            </button>
            </center>
            </form>
        <img
          src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVnaXN0cmF0aW9ufGVufDB8fDB8fHww&w=1000&q=80"
          className="hidden min-[1280px]:inline mt-6"
        ></img>
      </div>
    </>
  );
};

export default Register;