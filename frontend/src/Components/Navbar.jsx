import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [toggle,setToggle]=useState('hidden lg:visible')
    const [align,setAlign] = useState('flex-row-reverse')
    const[disp,setDisp]=useState(false)
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white px-12 border-b-2 border-gray-700">
  <div className="flex items-center flex-shrink-0 text-black md:mr-6  ">
   <Link to="/" ><span><img src="logo.png" className="w-24 md:w-[27%] mr-10 p-4"></img></span></Link>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-black hover:border-white" onClick={(e)=>{
        if(disp===false){
        setToggle('block lg:visible');setDisp(true);
        setAlign('justify-center items-center')
    }
        else{
         setToggle('hidden lg:visible')
         setAlign('flex-row-reverse')
         setDisp(false);
        }
    }}>
     <img src="hamburg.png"></img>
    </button>
  </div>
  <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${toggle}`}>
    <div className={`text-lg lg:flex-grow flex gap-6 ${align} text-black font-medium lg:px-12`}>
    <span className=''>
      </span>
      <span>
      <Link to="/login" className="inline mt-4 text-2xl p-3 lg:text-3xl font-bold  lg:mt-0  hover:underline">
      Login
      </Link>
      <Link to="/register" className="inline mt-4 text-2xl lg:text-3xl font-bold  lg:mt-0  hover:underline">
      Register
      </Link>
      </span>
    
    </div>
   
  </div>
</nav>
  )
}

export default Navbar