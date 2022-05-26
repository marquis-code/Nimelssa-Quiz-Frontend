import React, { useEffect, useState } from 'react';
import {getAdminSpotQuizStat} from '../apis/auth';
import { toast } from 'react-toastify';
import {isAuthenticated} from '../helpers/auth';
import {useNavigate} from 'react-router-dom';
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import {Helmet} from 'react-helmet';

const AdminSpotStat = () => {
    const [spotStat, setSpotStat] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }
      getAdminSpotQuizStat().then((response) => {
            setSpotStat(response.data)
            console.log(response.data);
        }).catch((error) => {
            toast.error(error.response.data.errorMessage, {theme : 'colored'})
        })
    }, [navigate])
    return (
        <>
        <Helmet><title>Nimelssa Quiz | SPOT statistics</title> </Helmet>
            <div className='w-11/12 mx-auto my-0 hidden lg:flex md:flex md:flex-col lg:flex-col'>
            {spotStat.length > 0 ? (
                  <div className='flex py-3 rounded-lg shadow-sm bg-yellow-500 mt-3'>
                  <div className='w-3/12 text-center font-semibold md:text-sm lg:text-base text-white'>Date</div>
                  <div className='w-3/12 text-center font-semibold md:text-sm lg:text-base text-white'>Matric</div>
                  <div className='w-3/12 text-center font-semibold md:text-sm lg:text-base text-white'>Score (No. Correct answers / Total No. of questions )</div>
                  <div className='w-3/12 text-center font-semibold md:text-sm lg:text-base text-white'>Total %</div>
                  <div className='w-3/12 text-center font-semibold md:text-sm lg:text-base text-white'>Time Submitted</div>
              </div> 
                ) : (
                 <div className='font-semibold font-sans text-xl'>Loading...</div>
                    )}
                <div>
                    {spotStat.map((singleStat) => {
                        const totalQuestions = singleStat.numberOfQuestions;
                        const totalScore = singleStat.score;
                        const result = (totalScore / totalQuestions) * 100;
                        const convertedNumber = Math.floor(result);
                        return (
                            <>
                                <div className='flex py-3 my-4 rounded-lg shadow-sm bg-gray-200'>
                                    <div className='w-3/12 text-center md:text-sm lg:text-base font-semibold'>{singleStat.date}</div>
                                    <div className='w-3/12 text-center md:text-sm lg:text-base font-semibold'>{singleStat.matric}</div>
                                    <div className='w-3/12 text-center md:text-sm lg:text-base font-semibold'>{singleStat.score}/{singleStat.numberOfQuestions}</div>
                                    {convertedNumber >= 50 ? (
                                        <div className='w-3/12 text-center md:text-sm lg:text-base font-semibold flex items-center justify-center'>
                                            <p className='mr-1'>{convertedNumber}</p>
                                            <p><FcCheckmark /></p>
                                        </div>
                                    ) : (

                                            <div className='w-3/12 text-center md:text-sm lg:text-base font-semibold flex items-center justify-center'>
                                                <p className='mr-1'>{convertedNumber}</p>
                                                <p><FcHighPriority /></p>
                                            </div>
                                        )}
                                    <div className='w-3/12 text-center md:text-sm lg:text-base font-semibold'>{`${singleStat.minutes} : ${singleStat.seconds}`}</div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

               {/* Mobile screen code */}
               <div className='lg:hidden md:hidden flex w-11/12 mx-auto'>
                 {spotStat.length > 0 ? (
                    <div className='flex bg-yellow-500 w-full mt-3 rounded-lg shadow-sm pr-2 py-2'>
                        <div className='w-1/12 text-xs font-semibold text-white py-2 text-center pl-2 select-none '>No.</div>
                        <div className='w-4/12 text-xs font-semibold text-white py-2 text-center pl-2 select-none '>Date</div>
                        <div className='w-4/12 text-xs font-semibold text-white py-2 text-center select-none '>Matric</div>
                        <div className='w-2/12 text-xs font-semibold text-white py-2 text-center select-none '>points</div>
                        <div className='w-2/12 text-xs font-semibold text-white py-2 text-center select-none '>score %</div>
                    </div>
                 ) : (
                    <div className='font-semibold font-sans text-xl'>Loading...</div>
                 )}
            </div>

            


            {spotStat && spotStat.map((singleStat, index) => {
                const { date, matric, score, numberOfQuestions } = singleStat;
                const totalQuestions = numberOfQuestions;
                const totalScore = score;
                const result = (totalScore / totalQuestions) * 100;
                const convertedNumber = Math.floor(result);
                return (
                    <>
                        <div className='lg:hidden md:hidden flex w-11/12 mx-auto flex-wrap'>
                            <div className='flex rounded-lg shadow-sm bg-gray-100 items-center justify-center my-3 py-3 px-2 w-full'>
                                <div className='w-1/12 font-semibold text-xs text-center text-center pr-2 select-none '>{index + 1}</div>
                                <div className='w-4/12 font-semibold text-xs text-center text-sm select-none '>{date}</div>
                                <div className='w-4/12 font-semibold text-xs text-center text-sm select-none '>{matric}</div>
                                <div className='w-2/12 font-semibold text-xs text-center text-sm select-none '>{score}/{numberOfQuestions}</div>
                                <div className='w-2/12 font-semibold text-xs text-center text-sm select-none '>{convertedNumber}</div>
                            </div>
                        </div>

                    </>
                )
            })} 
        </>
    )
}

export default AdminSpotStat;