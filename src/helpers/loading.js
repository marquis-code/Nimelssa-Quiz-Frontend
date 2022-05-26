import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

export const showLoading = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <BeatLoader  />
      </div>
   
    </>
  )
}