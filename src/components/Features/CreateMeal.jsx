import React, { useState } from "react";
import FeatureWrapper from "../UI/FeatureWrapper";
import { sendToast } from "../../utils/sendToast";
import { supabase } from "../../config/supabase.config";
import { useAuth } from "../../store/authContext";
import Loading from "../UI/Loading";
const CreateMeal = () => {
  const [name, setName] = useState("");
  const [addItems, setAddItems] = useState([""]);
  const [totalCalorie, setTotalCalorie] = useState("");
  const [totalProtein, setTotalProtein] = useState("");
  const [totalCarbs, setTotalCarbs] = useState("");
  const [totalFats, setTotalFats] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Meal")
        .insert([
          {
            meal_name: name,
            items: addItems,
            created_by: user?.id,
            total_calories: totalCalorie,
            total_carbs: totalCarbs,
            total_proteins: totalProtein,
            total_fats: totalFats,
          },
        ])
        .select();
      if (error) sendToast("error", error?.message);
      else {
        sendToast("success", "Meal Created");
        setAddItems(['']);
        setTotalCalorie("");
        setTotalCarbs("");
        setTotalFats("");
        setTotalProtein("");
        setName("");
      }
    } catch (error) {
      sendToast("error", error.message);
    }
    setLoading(false);
  };

  const handleAddItem = () => {
    if (addItems[addItems.length - 1].length < 1) {
      console.log(addItems);
      sendToast("error", "Item field can't be empty!");
    } else setAddItems([...addItems, ""]);
  };

  const handleDeleteItem = (index) => {
    if (index === 0) {
      return;
    }
    const updatedItems = [...addItems];
    updatedItems.splice(index, 1);
    setAddItems(updatedItems);
  };

  const handleItemChange = (index, value) => {
    let updatedItems = [...addItems];
    updatedItems[index] = value;
    setAddItems(updatedItems);
  };

  return (
    <Loading loading={loading}>
      <FeatureWrapper>
        <div>
          <h1 className="text-4xl text-green-600 font-semibold">
            Create your meal
          </h1>
          <p className="text-neutral-700 font-light">
            Create a meal and save it to your list.
          </p>
        </div>
        <div className="flex flex-col items-center mt-6 gap-2">
          <input
            type="text"
            placeholder="Eg. Evening Meal"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          {addItems&&addItems.map((item, index) => (
            <div key={index} className="flex sm:w-96 w-full gap-2 items-center">
              <input
                type="text"
                placeholder={
                  index === 0 ? "Eg. 100gm Spinach" : `Item ${index + 1}`
                }
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="border w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
              />
              <button
                onClick={() => handleDeleteItem(index)}
                className="text-red-600 font-bold px-2 text-2xl rounded-md bg-neutral-200"
                title="Delete Item"
              >
                -
              </button>
              {index === addItems.length - 1 && (
                <button
                  onClick={handleAddItem}
                  className="text-green-600 px-2 text-2xl font-bold rounded-md bg-neutral-200"
                  title="Add Item"
                >
                  +
                </button>
              )}
            </div>
          ))}
          <input
            min={0}
            type="number"
            placeholder="Total Calorie"
            value={totalCalorie}
            onChange={(e) => setTotalCalorie(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            min={0}
            type="number"
            placeholder="Total Protein"
            value={totalProtein}
            onChange={(e) => setTotalProtein(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            min={0}
            type="number"
            placeholder="Total Carbs"
            value={totalCarbs}
            onChange={(e) => setTotalCarbs(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            min={0}
            type="number"
            placeholder="Total Fats"
            value={totalFats}
            onChange={(e) => setTotalFats(e.target.value)}
            className="border sm:w-96 w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-green-600"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Create
          </button>
        </div>
      </FeatureWrapper>
    </Loading>
  );
};

export default CreateMeal;
