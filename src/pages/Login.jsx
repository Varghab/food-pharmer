import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase.config';
import { ToastContainer, toast } from 'react-toastify';
import { sendToast } from '../utils/sendToast';
import Loading from '../components/UI/Loading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {CheckAuth, isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if(error){
        sendToast('error',error.message);
        setLoading(false);

      }else{
        CheckAuth();
        sendToast('success',"Welcome to FoodPharmer");
          setLoading(false);
          navigate('/features'); // Redirect to a different page after successful signup

      }
    } catch (error) {
      sendToast('error',error.message);
      setLoading(false);
    }
  };

  useEffect(()=>{
    CheckAuth().then(({status})=>{
      status&&navigate('/features')
    })
  },[])

  return (
   <Loading loading={loading}>
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto w-[90%] bg-white rounded-md overflow-hidden shadow-md">
        <div className="text-3xl tracking-wide font-semibold bg-green-700 text-white py-2 px-4">
          Login
        </div>
        <form onSubmit={handleLogin} className="p-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder='yourname@example.com'
              className="border rounded w-full outline-none py-2 px-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-lg mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder='*********'
              className="border rounded w-full outline-none py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-green-700 text-lg text-white py-2 px-4 rounded hover:bg-green-800"
          >
            Login
          </button>
        </form>
        <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </div>
    </div>
    </Loading>
  );
}

export default Login
