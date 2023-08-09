import React, { useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const [formData, setformData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", formData)
      .then(function (response) {
        alert("Login Successfully");
        Cookies.set('token',response.data.token);
        Cookies.set('email',response.data.user.email);
        Cookies.set('userId',response.data.user._id);
        Cookies.set('role',response.data.user.role);
        const role=Cookies.get('role');
        if(role==='admin'){
            navigate('/adminDashboard')
        }
        else if(role=='requester'){
            navigate('/reqDashboard')
        }
        else if(role=='approver'){
            navigate('/appDashboard')
        }
        else{
            alert('Invalid role:')
        }
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
          <h1 className="text-3xl p-6 font-bold text-center">Login</h1>
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
          src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          className="hidden min-[1280px]:inline mt-6"
        ></img>
      </div>
    </>
  );
};

export default Login;