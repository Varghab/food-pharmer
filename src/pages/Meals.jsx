import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext'
import { supabase } from '../config/supabase.config';
import FeatureWrapper from '../components/UI/FeatureWrapper';
import { AiOutlineClose } from 'react-icons/ai';

const Meal = ({id,deleteMeal, mealName, items, totalCalories, totalProteins, totalFats, totalCarbs}) =>{

    return(
        <div className='py-3 px-4 bg-neutral-100 w-[90%] shadow-lg rounded-xl'>
            <div className='text-lg text-neutral-700 font-normal '>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-semibold text-green-600'>{mealName}</h1>
                    <AiOutlineClose onClick={()=>deleteMeal(id)} className='cursor-pointer' />
                </div>
                <hr className='mt-2 border-neutral-800' />
                <ul className='mt-2 list-none text-left'>
                    <h1 className='text-center font-semibold'>Items </h1>
                    {items.map((item,i)=><li key={i}>{item}</li>)}
                </ul>
                <hr className='mt-2 border-neutral-800' />
                <div className='mt-2'>
                    <div className='flex justify-between gap-2 items-center'>
                        <p>Total Calories</p>
                        <p>{totalCalories} Kcal</p>
                    </div>
                    <div className='flex justify-between gap-2 items-center'>
                        <p>Total Carbs</p>
                        <p>{totalCarbs} {totalCarbs<2?"Gram":"Grams"}</p>
                    </div>
                    <div className='flex justify-between gap-2 items-center'>
                        <p>Total Proteins</p>
                        <p>{totalProteins} {totalProteins<2?"Gram":"Grams"}</p>
                    </div>
                    <div className='flex justify-between gap-2 items-center'>
                        <p>Total Fats</p>
                        <p>{totalFats} {totalFats<2?"Gram":"Grams"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Meals = () => {
    const {user:{_id}, CheckAuth, isAuthenticated} = useAuth();
    const [meals, setMeals] = useState();
    
    const getMeals = async (id) =>{
        let { data: Meal, error } = await supabase
            .from('Meal')
            .select("*")
            .eq('created_by', id)
            console.log(Meal);
        if(Meal.length>0) setMeals(Meal);
        else setMeals(null)
    }  
    useEffect(()=>{
        CheckAuth().then(({id})=>{
            getMeals(id);
        })
    },[])

    const deleteMeal = async(id) => {
        const { error } = await supabase
            .from('Meal')
            .delete()
            .eq('id', id)
        CheckAuth().then(({id})=>{
            getMeals(id);
        })
    }
    
    return (
    <FeatureWrapper >
        <div>
            <h1 className='text-3xl font-semibold text-green-600'>Your Meals</h1>
            <div className='mt-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 justify-items-center place-content-center'>
                {meals?meals.map(meal=><Meal key={meal.id} deleteMeal={deleteMeal} id={meal.id} mealName={meal.meal_name} items={meal.items} totalCalories={meal.total_calories} totalProteins={meal.total_proteins} totalFats={meal.total_fats} totalCarbs={meal.total_carbs}/>):<p className='mx-auto col-span-3'>No meal has been created!</p>}
            </div>
        </div>
    </FeatureWrapper>
    )
}

export default Meals
