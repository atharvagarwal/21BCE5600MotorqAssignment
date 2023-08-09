import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const RequesterDashboard = () => {
    const navigate = useNavigate()
    const userId=Cookies.get('userId');
    const [items,setItems] = useState([])
    useEffect(() => {
        getRequests();
      }, []);

    const getRequests = () => {
        axios.get(`http://localhost:3001/req/getRequests/${userId}`).then((res) => {
          setItems(res.data);
          console.log(res.data);
        });
      };
      const approvedRequests = () => {
        axios.get(`http://localhost:3001/req/getApprovedRequests/${userId}`).then((res) => {
          setItems(res.data);
        });
      }
      const logout=(e)=>{
        axios
        .post("http://localhost:3001/auth/logout")
        .then(function (response) {
          alert("Logout Successfull");
          Cookies.remove('token');
          Cookies.remove('email');
          Cookies.remove('userId');
          Cookies.remove('role');
          navigate('/')
      })
        .catch(function (error) {
          alert(error.message);
        });
        
    }
  return (
    <div>
        <button onClick={()=>{navigate('/createRequest')}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Make Request</button>
        <button onClick={()=>{approvedRequests()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Requests Approved</button>
        <button onClick={()=>{getRequests()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Default</button>
        <button onClick={()=>{logout()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Logout</button>
        <center><h1 className="text-3xl font-bold mt-6">Requester Dashboard</h1></center>
       
        <div >
        <div className="flex flex-wrap justify-center items-center">
        {items.map((item) => {
                      
                    return (
                        <div className="sm:w-full md:w-1/2 lg:w-1/4 bg-gray-200 m-2 p-2  rounded-lg">
                            <h1 className="text-3xl font-bold">{item.description}</h1>
                            <h1 className="text-2xl font-medium">{item.justification.slice(0,25)}...</h1>
                            <h1 className="text-xl font-medium"> {item.timestamp}</h1>
                            <h1 className="text-xl font-medium"><b>Workflow:</b>{item.workflow}</h1>
                           <div className="flex flex-col gap-3"> <p className="text-xl"><b>Id:</b> {item._id}</p>
                            {item.status?<p className="text-xl font-bold text-green-600">Approved</p>:<p className="text-xl text-red-600 font-bold">Pending/Rejected</p>}</div>
                        </div>
                       
                      );
                    })}
        </div>
        </div>
       

    </div>
  )
}

export default RequesterDashboard