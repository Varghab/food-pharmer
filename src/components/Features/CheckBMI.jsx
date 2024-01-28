import React, { useState } from "react";
import FeatureWrapper from "../UI/FeatureWrapper";
import { sendRequest } from "../../utils/sendRequest";
import { sendToast } from "../../utils/sendToast";

const HealthCard = ({ score, emoji, categoryName, bgColor }) => {
  return (
    <div
      className={`w-60 h-60 ${bgColor} shadow-lg transition-all duration-200  rounded-lg py-3 px-2`}
    >
      <div>
        <p className="text-3xl">{emoji}</p>
        <p className="text-lg mt-2 font-light">Your BMI is {score}</p>
        <p className="text-2xl mt-1">You are under {categoryName} Category.</p>
      </div>
    </div>
  );
};

const CheckBMI = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState();

  const handleSearch = async () => {
    const options = {
      url: `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`,
      method: "GET",
      host:'fitness-calculator.p.rapidapi.com'
    };
    try {
      const result = await sendRequest(options);
      const res = await result.json();
      if(res.errors&&res.errors.length>0){
        res.errors.forEach((error)=>sendToast('error', error))
      }
      else setBmi(res.data);
    } catch (error) {
      sendToast("error", error.message)
    }
  };

  return (
    <div>
      <FeatureWrapper
        featureName="Check Your BMI"
        featureDescription="BMI is calculated to assess an individual's weight status by comparing their weight to height. It serves as a quick screening tool for identifying potential health risks associated with underweight, normal weight, overweight, or obesity. "
      >
        <div className="mt-2">
          <p className="text-xl">
            The BMI categories are generally as follows:
          </p>
          <ul className="text-neutral-700 font-light text-lg mt-2">
            <li className="">Underweight: BMI less than 18.5</li>
            <li className="">Normal Weight: BMI 18.5 to 24.9</li>
            <li className="">Overweight: BMI 25 to 29.9</li>
            <li className="">Obesity: BMI 30 or greater</li>
          </ul>
        </div>
        <div className="flex items-center mt-6 flex-col md:flex-row gap-2 justify-center ">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Check
          </button>
        </div>
        <div className="mt-4">
          <p className="font-light text-red-500 italic ">
            Note: Weight should be in Kilograms & Height should be in
            Centimetres
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          {bmi&&bmi.bmi < 18.5 && <HealthCard emoji="😑" score={bmi.bmi} categoryName={bmi.health} bgColor="bg-[#F3E99F]" />}
          {bmi&&bmi.bmi > 18.5 && bmi.bmi < 24.9 ? <HealthCard emoji="😀" score={bmi.bmi} categoryName={bmi.health} bgColor="bg-[#B7E5B4]" /> : null}
          {bmi&&bmi.bmi > 25 && bmi.bmi < 29.9 ? <HealthCard emoji="😥" score={bmi.bmi} categoryName={bmi.health} bgColor="bg-[#FFACAC]" /> : null}
          {bmi&&bmi.bmi > 30 && <HealthCard emoji="😭" score={bmi.bmi} categoryName={bmi.health} bgColor="bg-[#E96479]" />}
        </div>

      </FeatureWrapper>
    </div>
  );
};

export default CheckBMI;
