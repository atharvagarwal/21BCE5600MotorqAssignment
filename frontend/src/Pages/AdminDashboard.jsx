import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AdminDashboard = () => {
    const navigate = useNavigate()
    const userId=Cookies.get('userId');
    const [items,setItems] = useState([])
    const [description,setDescription] = useState('')
    useEffect(() => {
        getRequests();
      }, []);

    const getRequests = () => {
        axios.get(`http://localhost:3001/admin/getRequests`).then((res) => {
          setItems(res.data);
          console.log(res.data);
        });
      };
      const approvedRequests = () => {
        axios.get(`http://localhost:3001/admin/getApprovedRequests`).then((res) => {
          setItems(res.data);
        });
      };
      const rejectedRequests = () => {
        axios.get(`http://localhost:3001/admin/getRejectedRequests`).then((res) => {
          setItems(res.data);
        });
      };
      const approver = (requestId) => {
        axios
      .post("http://localhost:3001/admin/approve", {requestId:requestId})
      .then(function (response) {
        alert("Approved by Admin");
        window.location.reload();
    })
      .catch(function (error) {
        alert(error);
      });
      };
      const sortRequests=()=>{
        axios.get(`http://localhost:3001/admin/getLatestRequests`).then((res) => {
            setItems(res.data);
          });
      }

    const workflowHandler=(e)=>{
        e.preventDefault();
        axios
        .post("http://localhost:3001/admin/createWorkflow", {description:description})
        .then(function (response) {
          alert("workflow created");
      })
        .catch(function (error) {
          alert(error.message);
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
        <button onClick={()=>{rejectedRequests()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Pending/Rejected Requests</button>
        <button onClick={()=>{approvedRequests()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Requests Approved</button>
        <button onClick={()=>{getRequests()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Default</button>
        <button onClick={()=>{sortRequests()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">SortByTime</button>
        <button onClick={()=>{logout()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Logout</button>

        <form onSubmit={workflowHandler} className="p-2">Workflow: <input type="text" placeholder="admin only/both/approver only" className="m-2 p-1 rounded-md border-2 border-black" onChange={(e)=>{setDescription(e.target.value)}}/>
        <button type="submit" className=" hover:bg-gray-200 text-black font-bold py-2 px-4 border border-blue-700 rounded m-2">Submit</button>
        </form>
        <center><h1 className="text-3xl font-bold mt-6">Audits (History)</h1></center>
       
        <div >
        <div className="flex flex-wrap justify-center items-center">
        {items.map((item) => {
                      
                    return (
                        <div className="sm:w-full md:w-1/2 lg:w-1/4 bg-gray-200 m-2 p-2  rounded-lg">
                            <h1 className="text-3xl font-bold">{item.description}</h1>
                            <h1 className="text-2xl font-medium">{item.justification.slice(0,25)}...</h1>
                            <h1 className="text-xl font-medium"><b>Time:</b> {item.timestamp}...</h1>
                            <h1 className="text-xl font-medium"><b>Workflow:</b>{item.workflow}</h1>
                           <div className="flex flex-col gap-3"> <p className="text-xl"><b>Id:</b> {item._id}</p>
                            {item.status?<p className="text-xl font-bold text-green-600">Approved</p>:<p className="text-xl text-red-600 font-bold">Pending/Rejected</p>}</div>
                            {item.status?<></>:<button onClick={()=>{approver(item._id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">Approve</button>}
                        </div>
                       
                      );
                    })}
        </div>
        </div>
       

    </div>
  )
}

export default AdminDashboard