


import { Routes, Route } from "react-router-dom"
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RequesterDashboard from "./Pages/RequesterDashboard";
import MakeRequests from "./Pages/MakeRequests";
import AppDashboard from "./Pages/AppDashboard";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={ <Landing/> } />
    <Route path="/login" element={ <Login/> } />
    <Route path="/register" element={ <Register/> } />
    <Route path="/reqDashboard" element={ <RequesterDashboard/> } />
    <Route path="/createRequest" element={ <MakeRequests/> } />
    <Route path="/appDashboard" element={ <AppDashboard/> } />
    <Route path="/adminDashboard" element={ <AdminDashboard/> } />

    </Routes>
    </div>
  );
}

export default App;
