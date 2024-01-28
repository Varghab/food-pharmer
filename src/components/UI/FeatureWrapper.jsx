import React from 'react'
import { ToastContainer } from 'react-toastify'

const FeatureWrapper = ({featureName,featureDescription, children}) => {
  return (
    <div className='min-h-screen py-6'>
      <div className='max-w-4xl w-[95%] mx-auto '>
        <h1 className='text-4xl text-green-600 font-semibold'>{featureName}</h1>
        <p className='mt-2 font-normal text-lg text-gray-500'>{featureDescription}</p>
        <div className={``}>
            {children}
        </div>  
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
  )
}

export default FeatureWrapper
