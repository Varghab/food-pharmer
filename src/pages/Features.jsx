import React, { useEffect } from 'react'
import FeatureCard from '../components/UI/FeatureCard'
import { AiOutlineNodeIndex } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { PiCookingPot } from "react-icons/pi";
import { supabase } from '../config/supabase.config';

export const features = [
  {
    name:"Check Body Mass Index",
    slug:"checkbmi",
    icon: <AiOutlineNodeIndex className='text-3xl text-yellow-600 ' />
  },
  // {
  //   name:"Check Burnt Calories",
  //   slug:"checkcalorie",
  //   icon: <FaRunning className='text-3xl text-blue-700 ' />
  // },
  {
    name:"Recipe by Nutrients",
    slug:"recipebynutrients",
    icon: <GiChickenOven className='text-3xl text-red-500 '/>
  },
  {
    name:"Check Calorie Requirement",
    slug:"checkcalorierequirement",
    icon: <GiMuscleUp className='text-3xl text-green-700 ' />
  },
  {
    name:"Create Meal",
    slug:"createmeal",
    icon: <PiCookingPot className='text-3xl text-neutral-700 ' />
  },
]

const Features = () => {
  return (
    <div className=' py-6'>
      <div className='max-w-3xl w-[95%] mx-auto '>
        <h1 className='text-4xl text-green-600 font-semibold'>Our Features</h1>
        <div className='md:mt-10 mt-6 flex gap-3 items-center flex-wrap justify-center'>
            {features.map(feature=><FeatureCard slug={feature.slug} name={feature.name} icon={feature.icon} />)}
        </div>  
      </div>
      
    </div>
  )
}

export default Features
