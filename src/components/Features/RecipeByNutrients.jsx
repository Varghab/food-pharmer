import React, { useState } from "react";
import FeatureWrapper from "../UI/FeatureWrapper";
import { sendRequest } from "../../utils/sendRequest";
import { getRandomElements } from "../../utils/getRandomElements";
import Loading from "../UI/Loading";


const RecipeCard = ({img,name,servingSize,nutrients:{caloriesKCal
,protein,totalCarbs,sugar}}) => {
  return(
    <div className="rounded-xl min-w-60 max-w-96 shadow-lg">
      <div className="rounded-t-xl h-40 overflow-hidden object-center ">
        <img className="rounded-t-xl" loading="lazy" src={img}></img>
      </div>
      <div className="py-3 px-4">
        <div>
          <h1 className="text-lg">{name}</h1>
        </div>
        <div className="mt-2">
          <hr className="border-neutral-300" />
        </div>
        <div className="mt-2 font-light">
          <div className="flex justify-between items-center">
            <p>Serving Size</p>
            <p>{servingSize} Grams</p>
          </div>
          <div className="flex justify-between mt-1 items-center">
            <p>Calories</p>
            <p>{caloriesKCal} Kcal</p>
          </div>
          <div className="flex justify-between mt-1 items-center">
            <p>Carbs</p>
            <p>{totalCarbs} Grams</p>
          </div>
          <div className="flex justify-between mt-1 items-center">
            <p>Protein</p>
            <p>{protein} grams</p>
          </div>
          <div className="flex justify-between mt-1 items-center">
            <p>Sugar</p>
            <p>{sugar} grams</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecipeByNutrients = () => {
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sugar, setSugar] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async() => {
    setLoading(true);
    const options = {
      url: `https://low-carb-recipes.p.rapidapi.com/search?maxCalories=${calories}&maxNetCarbs=${carbs}&maxSugar=${sugar}&limit=20`,
      method: "GET",
      host: 'low-carb-recipes.p.rapidapi.com'
    };
    const result = await sendRequest(options);
    result.json().then((data)=>{
      const elements = getRandomElements(data,3);
      setRecipes(elements);
      setTimeout(()=>{
        setLoading(false)
      },1000)
    })
    setLoading(false)
  };
  return (
    <Loading loading={loading}>
    <div>
      <FeatureWrapper
        featureName="Recipe By Nutrients"
        featureDescription="Food search by nutritional criteria empowers users to make informed dietary choices, aligning with specific carb, sugar, carbs, and calorie requirements. This promotes personalized nutrition, aiding individuals in weight management, fitness goals, and dietary adherence."
      >
        <div className="mt-3">
          <p className="text-xl font-light text-neutral-700">We will find you the recipes based on your nutritional requirements.</p>
        </div>
        <div className="flex items-center mt-6 flex-col md:flex-row gap-2 justify-center">
            <input
              type="number"
              placeholder="Enter Max Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
            />
          <input
            type="number"
            placeholder="Enter Max carbs"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="number"
            placeholder="Enter Max sugar "
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Check
          </button>
        </div>
        <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-content-center justify-items-center	justify-self-center	 gap-4">
          {recipes.map(recipe=><RecipeCard img={recipe.image} name={recipe.name} servingSize={recipe.servingSizes[0].grams} nutrients={recipe.nutrients} />)}
        </div>
      </FeatureWrapper>
    </div>
    </Loading>
  );
};

export default RecipeByNutrients;
