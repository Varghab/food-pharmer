import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { signupApi } from '../api/signupApi';
import { sendToast } from '../utils/sendToast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import Loading from '../components/UI/Loading';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate= useNavigate();
  const {CheckAuth, isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignup = async(e) => {
    setLoading(true);
    e.preventDefault();
    if(confirmPassword!==password){
      setLoading(false);
      sendToast("error","Both password should match")
      return;
    }
    try {
      const {data, error} = await signupApi({email, password});
      if (error) {
        sendToast('error',error.message);
        setLoading(false);

      } else {
        CheckAuth();
        sendToast('success',"User signed up successfully!");
        setTimeout(()=>{
          setLoading(false);
          navigate('/features'); // Redirect to a different page after successful signup
        },2000);
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
          Signup
        </div>
        <form onSubmit={handleSignup} className="p-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder='yourname@example.com'
              required={true}
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
              placeholder='*********'
              required
              className="border rounded w-full outline-none py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block text-gray-700 text-lg mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              placeholder='*********'
              required
              className="border rounded w-full outline-none py-2 px-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-green-700 text-lg text-white py-2 px-4 rounded hover:bg-green-800"
            >
            Signup
          </button>
        </form>
      </div>
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
    </Loading>
  );
}

export default Signup
