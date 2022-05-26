import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../helpers/auth';
import {useNavigate} from 'react-router-dom';

const QuizChoice = () => {
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
                    <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./quiz.svg' className='h-20 w-20' alt='icon'/></div>
                    <div className='p-2'>
                        <p className='text-gray-700 font-bold text-center font-sans text-xl py-3'>NIMELSSA Mcq quiz</p>
                        <p className='font-semibold font-sans text-sm text-gray-400 text-center py-3'>Here you can access quiz application. Click on the button below to begin.</p>
                        <button className='bg-gradient-to-l from-green-900 to-green-900 hover:bg-gradient-to-r text-white  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 rounded-lg bg-gray-200 font-semibold w-full  my-3 py-3 text-center' onClick={() => {navigate('/quiz-instructions')}}>Attempt Quiz</button>
                    </div>
                </div>

                <div className='rounded-lg shadow-sm border md:mr-4 my-3 lg:my-0'>
                    <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./quiz.svg' className='h-20 w-20' alt='icon'/></div>
                    <div className='p-2'>
                        <p className='text-gray-700 font-bold text-center font-sans text-xl py-3'>NIMELSSA True/False quiz</p>
                        <p className='font-semibold font-sans text-sm text-gray-400 text-center py-3'>Here you can access quiz application. Click on the button below to begin.</p>
                        <button className='bg-gradient-to-l from-green-900 to-green-900 hover:bg-gradient-to-r text-white  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 rounded-lg bg-gray-200 font-semibold w-full  my-3 py-3 text-center' onClick={() => {navigate('/play-true-false')}}>Attempt Quiz</button>
                    </div>
                </div>

                <div className='rounded-lg shadow-sm border md:mr-4 my-3 lg:my-0'>
                    <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./quiz.svg' className='h-20 w-20' alt='icon'/></div>
                    <div className='p-2'>
                        <p className='text-gray-700 font-bold text-center font-sans text-xl py-3'>NIMELSSA Spot quiz</p>
                        <p className='font-semibold font-sans text-sm text-gray-400 text-center py-3'>Here you can access spot quiz application. Click on the button below to begin.</p>
                        <button className='bg-gradient-to-l from-green-900 to-green-900 hover:bg-gradient-to-r text-white  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 rounded-lg bg-gray-200 font-semibold w-full  my-3 py-3 text-center'  onClick={() => {navigate('/play_spot')}}>Attempt Quiz</button>
                    </div>
                </div>

            </div>

        </div>
        </>
    )
}

export default QuizChoice;