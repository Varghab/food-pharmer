import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Drawer = ({toggle, setToggle, isAuthenticated, Logout}) => {
  return (
    <div className={`h-screen z-[100] fixed top-0 right-0 w-60 bg-neutral-200 transition-all duration-300 ease-in-out ${toggle?"translate-x-0":"translate-x-full"} `}>
      <div className='py-6 px-4'>
        <div className='flex justify-end'>
          <AiOutlineClose onClick={()=>setToggle(p=>!p)} className='text-xl' />
        </div>
        <div className='text-left mt-12 text-2xl'>
          <p>Home</p>
          <Link onClick={()=> setToggle(p=>!p)} to='/features'><p className='mt-1'>Features</p></Link>
          <Link onClick={()=> setToggle(p=>!p)} to='/mymeal'><p className='mt-1'>Meals</p></Link>
          {isAuthenticated?<p onClick={Logout} className='mt-1'>Logout</p>:<div>
            <Link onClick={()=> setToggle(p=>!p)} to='/signup'><p className='mt-1'>Sign up</p></Link>
            <Link onClick={()=> setToggle(p=>!p)} to='/login'><p className='mt-1'>Log in</p></Link>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Drawer
