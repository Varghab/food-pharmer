import React from 'react'
import { AiOutlineNodeIndex } from "react-icons/ai";
import { Link } from 'react-router-dom';

const FeatureCard = ({name, icon, slug}) => {
  return (
    <Link to={`/features/${slug}`} className='w-[90%] md:w-40 h-40 rounded-xl flex items-center justify-center gap-2 bg-gray-200 cursor-pointer duration-150 transition-all ease-in-out hover:bg-gray-300 hover:shadow-md' >
      <div className='w-full h-full p-4 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            {icon}
            <p className='text-xl font-light'>{name}</p>
          </div>
      </div>
    </Link>
  )
}

export default FeatureCard
