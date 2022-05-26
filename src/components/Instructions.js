import React from 'react';
import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
    const navigate = useNavigate();
    const instructionsArray = [
        {id: 1, instruction :'The quiz has a duration of 15 minutes and ends as soon as your time elapses.'},
        {id: 2, instruction :'The quiz ends automatically as soon as browser is closed.'},
        {id: 3, instruction :'The quiz consist of 25 questions.'},
        {id: 4, instruction :'Each question has four options.'},
        {id: 5, instruction :'You will recieve a point for every correct answer submittted'},
        {id: 6, instruction :'Select the option which best answers the question by clicking (or selecting) it'},
        {id: 7, instruction :'Each game has two life lines namely: 2 50-50 chances and 5 Hints'},
        {id: 8, instruction :' Select a 50-50 life line by clicking the icon; The computer will remove two wrong answers leaving the correct answer and one wrong answer'},
        {id: 9, instruction :' Use a hint by clicking the icon; the computer will  will remove two wrong answers leaving the correct answer and one wrong answer'},
        {id: 10, instruction :'The timer starts as soon as the quiz questions loads.'},
        {id: 11, instruction :'You will be required to enter your matric number at the end of the quiz exercise.'},
        {id: 12, instruction :'Avoid refreshing your browser as this may result to restarting of the quiz.'},
        {id: 13, instruction :'You have only on eattempt to take the Online Quiz test'},
        {id: 14, instruction :'Attempting the Quiz multiple times is highly prohibited, as this will result in cancellation of your entire quiz scores.'},
        {id: 15, instruction :'Lets do this if you think you have got what it takes.'}
    ]
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Instructions page</title> </Helmet>
                <div className='w-11/12 mx-auto my-0 md:rounded-lg md:shadow-sm md:p-3'>
                      <div className='font-bold text-xl text-center font-sans py-3'>NIMELSSA QUIZ INSTRUCTION GUIDE</div>
                      <p></p>
                    {
                        instructionsArray.map((singleInstruction) => {
                            const {instruction, id} = singleInstruction;
                            return (
                           <div key={id} className='flex items-center'>
                             <div className='w-1/12 p-3 bg-gray-100 text-green-900 font-sans flex justify-center items-center  text-sm font-semibold md:text-lg border-2 rounded-full shadow-sm'>{id}</div>
                              <div className='flex my-3'>
                                  <div className='w-full p-3  md:text-xl text-sm font-sans'>{instruction}</div>
                              </div>
                           </div>
                          )
                        })
                    }
                    <div className='md:flex justify-between py-3 '>
                        <div onClick={()=>{navigate('/play')}} className='mb-6 cursor-pointer md:my-0 font-semibold md:mr-6 bg-green-900 text-white text-center font-sans rounded-full shadow-sm py-2 w-full'>Continue</div>
                        <div onClick={()=>{navigate(-1)}} className='mt-6 cursor-pointer md:my-0 font-semibold md:ml-6 bg-green-900 text-white text-center font-sans rounded-full shadow-sm py-2 w-full'>Go Back</div>
                    </div>
                </div>
        </>
    )
}

export default Instructions;