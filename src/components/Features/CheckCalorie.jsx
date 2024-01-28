import React, { useState } from "react";
import FeatureWrapper from "../UI/FeatureWrapper";
import { sendRequest } from "../../utils/sendRequest";
import { sendToast } from "../../utils/sendToast";
import Loading from '../UI/Loading'

const CalorieCard = ({maintain, mildLoss, normalLoss, extremeLoss, mildGain, normalGain,extremeGain}) =>{
  return(
    <div className="rounded-xl bg-blue-600/10 w-[90%] mx-auto max-w-[30rem] shadow-lg py-3 px-4">
      <div>
        <p className="text-xl mt-2">Weight Loss</p>

        <div className="font-light flex items-center mt-2 justify-between">
          <p>To maintain weight</p>
          <p>{Math.floor(maintain)} Kcal</p>
        </div>
        <div className="font-light flex mt-1 items-center justify-between">
          <p>Mild weight loss</p>
          <p>{Math.floor(mildLoss)} Kcal</p>
        </div>
        <div className="font-light flex mt-1 items-center justify-between">
          <p>Normal weight loss</p>
          <p>{Math.floor(normalLoss)} Kcal</p>
        </div>
        <div className="font-light flex mt-1 items-center justify-between">
          <p>Extreme weight loss</p>
          <p>{Math.floor(extremeLoss)} Kcal</p>
        </div>
        <hr className="mt-2 border-neutral-400" />
        <p className="text-xl mt-2">Weight Gain</p>
        <div className="font-light flex mt-2 items-center justify-between">
          <p>Mild weight gain</p>
          <p>{Math.floor(mildGain)} Kcal</p>
        </div>
        <div className="font-light flex mt-2 items-center justify-between">
          <p>Normal weight gain</p>
          <p>{Math.floor(normalGain)} Kcal</p>
        </div>
        <div className="font-light flex mt-2 items-center justify-between">
          <p>Extreme weight gain</p>
          <p>{Math.floor(extremeGain)} Kcal</p>
        </div>
      </div>
    </div>
  )
}

const CheckCalorie = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [requirement, setRequirement] = useState();
  const [loading, setLoading] = useState(false);
  const handleSearch = async() => {
    setLoading(true);
    const options = {
      url: `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activity}`,
      method: "GET",
      host: 'fitness-calculator.p.rapidapi.com'
    };
    try {
      const result = await sendRequest(options);
      const res = await result.json();
      if(res.errors&&res.errors.length>0){
        res.errors.forEach((error)=>sendToast('error', error))
      }
      else setRequirement(res.data.goals);
      setLoading(false);
    } catch (error) {
      sendToast("error", error.message)
      setLoading(false);
    }
  };
  return (
    <Loading loading={loading} >
    <div>
      <FeatureWrapper
        featureName="Check Your Calorie Requirement"
        featureDescription="Knowing your daily caloric needs is crucial for maintaining a healthy lifestyle. It allows you to manage weight effectively, whether your goal is weight maintenance, loss, or gain. Calculating your maintenance calories helps you strike a balance, preventing excesses or deficiencies."
      >
        <div
          className="flex items-center mt-6 gap-6 
        justify-center flex-col md:flex-row "
        >
          <div className="flex items-center flex-col gap-2 sm:w-max w-full">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border sm:w-96 w-[90%] border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border sm:w-96 w-[90%] border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
            >
              <option className="border-none" value="">Select Gender</option>
              <option className="border-none" value="male">Male</option>
              <option className="border-none" value="female">Female</option>
            </select>
            <input
              type="number"
              placeholder="Height(in Centimeters)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border sm:w-96 w-[90%] border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
            />
            <input
              type="number"
              placeholder="Weight(in Kilograms)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border sm:w-96 w-[90%] border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
            />
          </div>
          <div className="font-light">
            <label className="text-gray-600 font-semibold text-lg">
              Choose your daily activity:
            </label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="radio"
                id="littleOrNoExercise"
                name="activity"
                value="littleOrNoExercise"
                checked={activity === "level_1"}
                onChange={() => setActivity("level_1")}
              />
              <label htmlFor="littleOrNoExercise">Little or no exercise</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="lightExercise"
                name="activity"
                value="lightExercise"
                checked={activity === "level_2"}
                onChange={() => setActivity("level_2")}
              />
              <label htmlFor="lightExercise">
                Light Exercise (1-3 times/week)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="moderateExercise"
                name="activity"
                value="moderateExercise"
                checked={activity === "level_3"}
                onChange={() => setActivity("level_3")}
              />
              <label htmlFor="moderateExercise">
                Moderate Exercise (4-5 times/week)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="dailyExercise"
                name="activity"
                value="dailyExercise"
                checked={activity === "level_4"}
                onChange={() => setActivity("level_4")}
              />
              <label htmlFor="dailyExercise">Daily Exercise</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="dailyIntenseExercise"
                name="activity"
                value="dailyIntenseExercise"
                checked={activity === "level_5"}
                onChange={() => setActivity("level_5")}
              />
              <label htmlFor="dailyIntenseExercise">
                Daily Intense Exercise
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSearch}
            className="bg-green-600 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Check
          </button>
        </div>
        <div className="mt-6 ">
          {requirement&&<CalorieCard maintain={requirement["maintain weight"]} mildLoss={requirement["Mild weight loss"]["calory"]} normalLoss={requirement["Weight loss"]["calory"]} extremeLoss={requirement["Extreme weight loss"]["calory"]} mildGain={requirement["Mild weight gain"]["calory"]} normalGain={requirement["Weight gain"]["calory"]} extremeGain={requirement["Extreme weight gain"]["calory"]} />}
        </div>
      </FeatureWrapper>
    </div>
    </Loading>
  );
};

export default CheckCalorie;
