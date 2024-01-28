import React from 'react'
import HeaderImg from '../../assets/header/header.png'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className=' font-sans py-4 px-6  mx-auto'>
        <div className='max-w-xl mx-auto'>
            <h1 className='md:text-4xl text-2xl font-bold'>Welcome to <span className='text-green-600 underline'>FoodPharmer</span></h1>
            <p className='md:text-xl text-lg mt-2 tracking-wide text-neutral-700'>
            Our mission is to empower you with the knowledge and resources needed to make informed choices that will positively impact your life. </p>
            <Link to='/features'><button className='py-1 px-4 rounded-lg text-xl text-neutral-200 mt-3 bg-green-600 hover:bg-green-700'>Get Started</button></Link>
        </div>
        <div className=''>
          <div className='max-w-[24rem] mx-auto'>
            <img src={HeaderImg}></img>
          </div>
        </div>
    </div>
  )
}

export default Header
