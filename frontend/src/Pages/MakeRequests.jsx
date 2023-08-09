import React, { useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";

const MakeRequests = () => {
  const [formData, setformData] = useState({userId:Cookies.get('userId')});
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:3001/req/createRequest", formData)
      .then(function (response) {
        alert("Made Requests Successfully").catch(function(e){
            console.log(e.message);
        })
    
    }).catch(function (error) {
        alert(error);
      });
  };
  return (
    <>
      <div
        className="flex items-center justify-around"
      >
        <form className="w-full max-w-lg flex justify-center p-6 flex-col" onSubmit={submitHandler}>
          <h1 className="text-3xl p-6 font-bold text-center">Make Requests</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Description
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Sick Leave"
                onChange={(e) => {
                  let description = { description: e.target.value };
                  setformData({ ...formData, ...description });
                }}
                required
              />
            </div>
          
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Justification
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Due to High Fever"
                onChange={(e) => {
                    let justification = { justification: e.target.value };
                    setformData({ ...formData, ...justification});
                }}
                required
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Workflow
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="admin only/approver only/both"
                onChange={(e) => {
                    let workflow = { workflow: e.target.value };
                    setformData({ ...formData, ...workflow});
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
      </div>
    </>
  );
};

export default MakeRequests;