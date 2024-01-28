import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Login from './pages/Login';
import Signup from './pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import CheckBMI from './components/Features/CheckBMI';
import CheckBurntCalorie from './components/Features/CheckBurntCalorie';
import RecipeByNutrients from './components/Features/RecipeByNutrients';
import CheckCalorie from './components/Features/CheckCalorie';
import CreateMeal from './components/Features/CreateMeal';
import Meals from './pages/Meals';
import { useEffect } from 'react';
import { useAuth } from './store/authContext';
import ProtectRoute from './components/ProtectRoute';

function App() {
  console.log(import.meta.env.VITE_RAPIDAPI_KEY) // 123
  const {CheckAuth} = useAuth();
  useEffect(()=>{
    CheckAuth();
  },[])
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      children:[
        {
          path:"/",
          element:<Home />,
        },
        {
          path:'/features',
          element:<Features />,
        },{
          path:'/login',
          element: <Login />
        },{
          path:'/signup',
          element: <Signup />
        },
        {
          path:'/features/checkbmi',
          element:<ProtectRoute><CheckBMI /></ProtectRoute>
        },
        {
          path:'/features/checkcalorie',
          element:<ProtectRoute><CheckBurntCalorie /></ProtectRoute>
        },
        {
          path:'/features/recipebynutrients',
          element:<ProtectRoute><RecipeByNutrients /></ProtectRoute>
        },
        {
          path:'/features/checkcalorierequirement',
          element:<ProtectRoute><CheckCalorie /></ProtectRoute>
        },
        {
          path:'/features/createmeal',
          element:<ProtectRoute><CreateMeal /></ProtectRoute>
        },{
          path:'/mymeal',
          element:<ProtectRoute><Meals /></ProtectRoute>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} >

      </RouterProvider>
    </>
  )
}

export default App
