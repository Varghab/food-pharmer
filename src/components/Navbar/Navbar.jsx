import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/foodpharmerLogo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../store/authContext'
import { AiOutlineMenu } from 'react-icons/ai'
import Drawer from '../UI/Drawer'
import Overlay from '../UI/Overlay'
const Navbar = () => {
  const {isAuthenticated, Logout, CheckAuth} = useAuth();
  const [toggle, setToggle] = useState(false);
  const handleLogout = async () => {   
    Logout();
  }
  useEffect(()=>{
    CheckAuth();
  },[])
  return (
    <div className='max-w-7xl w-[90%] mx-auto py-3 flex items-center justify-between gap-14'>
        <Link to="/" ><div className='lg:w-60 w-40'>
          <img src={Logo}></img>
        </div></Link>
        <ul className='md:flex hidden items-center gap-4 text-xl flex-1 justify-end '>
          <Link to="/" ><li className='cursor-pointer font-[400] hover:underline underline-offset-4 transition-all duration-150 ease-in-out '>Home</li></Link>
          <Link to="/features" ><li className='cursor-pointer font-[400] hover:underline underline-offset-4 transition-all duration-150 ease-in-out '>Features</li></Link>
          <Link to="/mymeal" ><li className='cursor-pointer font-[400] hover:underline underline-offset-4 transition-all duration-150 ease-in-out '>Meals</li></Link>
        </ul>
        <div className='text-xl hidden md:flex items-center gap-3'>
          {isAuthenticated?<button onClick={handleLogout} id="login" className='py-[6px] px-4 rounded-full font-[400] bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out '>Logout</button> :<><Link to="/signup"><button id="signup" className='py-[6px] px-4 rounded-full font-[400] bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out '>Sign up</button></Link>
          <Link to="/login"><button id="login" className='py-[6px] px-4 rounded-full font-[400] bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out '>Login</button></Link></>}
        </div>
        <div>
          <AiOutlineMenu onClick={()=>setToggle(p=>!p)} className='text-2xl md:hidden' />
        </div>
        {toggle&&<Overlay />}
        <Drawer isAuthenticated={isAuthenticated} Logout={Logout} toggle={toggle} setToggle={setToggle} />
    </div>
  )
}

export default Navbar
