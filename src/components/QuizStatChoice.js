import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../helpers/auth';
import {useNavigate} from 'react-router-dom';

const StatChoice = () => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState('');
    useEffect(() => {
        const { username } = isAuthenticated();
        if (username) {
          setLoggedUser(username)
        }
    
      }, [])

      
    return(
        <>
        <div className='w-11/12 mx-auto my-0'>
          <div className='flex justify-between items-center px-2 py-6'>
          {loggedUser ? (
              <div className='font-serif font-thin text-2xl'><h1>Hey, {loggedUser}!</h1></div>
          ): (
            <div className='font-serif font-thin text-2xl'><h1>Hello</h1></div>
          )}
          </div>

            <div className='lg:flex justify-center items-center'>
                <div className='rounded-lg shadow-sm border md:mr-4 my-3 lg:my-0'>
                    <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./statistics.svg' className='h-20 w-20' alt='icon'/></div>
                    <div className='p-2'>
                        <p className='text-gray-700 font-bold text-center text-xl py-3'>Mcq quiz statistics</p>
                        <p className='font-semibold font-sans text-sm text-gray-400 text-center py-3 px-3'>Here you can access your mcq quiz statistics. Click on the button below to view stats.</p>
                        <button className='rounded-lg bg-green-900 text-white font-semibold w-full  my-3 py-3 text-center' onClick={() => {navigate('/quizStat')}}>Attempt Quiz</button>
                    </div>
                </div>

                <div className='rounded-lg shadow-sm border md:mr-4 my-4 lg:my-0'>
                    <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./statistics.svg' className='h-20 w-20' alt='icon'/></div>
                    <div className='p-2'>
                        <p className='text-gray-700 font-bold text-center text-xl py-3'>Spot quiz statistics</p>
                        <p className='font-semibold font-sans text-sm text-gray-400 text-center py-3 px-3'>Here you can find access your spot quiz statistics. Click on the button below to view stats.</p>
                        <button className='rounded-lg bg-green-900 text-white font-semibold w-full  my-3 py-3 text-center'  onClick={() => {navigate('/spotStat')}}>View Quiz statistics</button>
                    </div>
                </div>

            </div>

        </div>
        </>
    )
}

export default StatChoice;