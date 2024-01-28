import React from 'react'
import { HashLoader } from "react-spinners";

const Loading = ({loading, children}) => {
    return (
        <>
        {loading&&<div className='h-full w-full top-0 flex items-center justify-center fixed bg-neutral-400/70'>
            <HashLoader size={30} color="green" />
        </div>}
        {children}
        </>
    )
}

export default Loading
