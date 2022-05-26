import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../helpers/auth';
import { getOneUserQuizStat } from '../apis/auth';
import { toast } from 'react-toastify';
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const QuizStat = () => {
    const [quizData, setQuizData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated().role !== 0) {
            toast.error('Please login to access Quiz statistics', { theme: "colored" })
            navigate('/signin');
        }
        const { matric } = isAuthenticated();
        getOneUserQuizStat(matric)
            .then((response) => {
                setQuizData(response.data);
                console.log(response.data);
            }).catch((error) => {
                toast.error(error.response.data.errorMessage, { theme: 'colored' });
            })
    }, [navigate]);

    return (
        <>
            <Helmet><title>Nimelssa Quiz | Mcq Quiz stat</title> </Helmet>
            <div className='md:w-11/12 mx-auto my-0'>
                <div className='text-center w-full py-3 select-none font-semibold font-sans text-green-900'>MCQ Quiz Statistics </div>
                <div className='md:flex justify-between md:px-6 lg:px-16'>
                    <div className='py-2 flex items-center px-3 mx-2 border rounded-sm shadow-sm my-2'>
                        <p className='bg-green-700 p-1 rounded-full w-0 h-0 mr-2'></p>
                        <p className='font-sans text-sm text-gray-900 font-semibold'>Green dots indicates correct answer</p>
                    </div>
                    <div className='py-2 flex items-center px-3 mx-2 border rounded-sm shadow-sm my-2'>
                        <p className='bg-red-700 p-1 rounded-full w-0 h-0 mr-2'></p>
                        <p className='font-sans text-sm text-gray-900 font-semibold'>Red dots indicates wrong answer</p>
                    </div>
                </div>
                {quizData.length > 0 ? (
                    quizData.map((singleStat) => {
                        const { date, answeredQuestions, numberOfQuestions, score, minutes, seconds } = singleStat;
                        const totalQuestions = numberOfQuestions;
                        const totalScore = score;
                        const result = (totalScore / totalQuestions) * 100;
                        const convertedNumber = Math.floor(result);
                        return (
                            <>
                                <div className='rounded-lg shadow-sm border my-3 md:mx-0 mx-2 p-3'>
                                    <div className='md:px-10 md:rounded-lg md:shadow-sm md:border md:m-3 mb-6'>
                                        <div className='flex my-6 justify-between'>
                                            <div className='font-semibold md:text-base text-sm font-sans mb-2'>Date Submitted :</div>
                                            <div className='font-semibold md:text-base font-sans text-sm text-green-900'>{date}</div>
                                        </div>

                                        <div className='flex my-6 justify-between'>
                                            <div className='font-semibold text-sm md:text-base font-sans mb-2'>Overall score (%):</div>
                                            <div className='text-green-900 text-sm md:text-base font-sans font-semibold'>{convertedNumber}%</div>
                                        </div>

                                        <div className='flex my-6 justify-between'>
                                            <div className='font-semibold text-sm md:text-base font-sans mb-2'>No.Questions :</div>
                                            <div className='text-green-900 text-sm md:text-base font-sans font-semibold'>{numberOfQuestions} questions</div>
                                        </div>

                                        <div className='flex my-6 justify-between'>
                                            <div className='font-semibold mb-2 text-sm md:text-base'>Completion Time :</div>
                                            <div className='text-green-900 font-semibold text-sm md:text-base'>{minutes}mins {seconds}sec</div>
                                        </div>
                                    </div>

                                    <div>
                                        {answeredQuestions.map((singleAnswer, index) => {
                                            const { snapshotAnswer, snapshotClickedOption, snapshotQuestion } = singleAnswer;
                                            return (
                                                <>
                                                    <div className='md:px-10'>
                                                        <div className='border-b-2 border-gray-500  my-3'>
                                                            <div className='flex items-center mb-2'>
                                                                <p className='md:text-base mr-1 font-sans text-sm'>{snapshotAnswer === snapshotClickedOption ? (<FcCheckmark />) : (<FcHighPriority />)}</p>
                                                                <p className='md:text-base text-gray-900 mr-1 font-sans text-sm'>{index + 1}.</p>
                                                                <p className='md:text-base text-gray-900 font-semibold uppercase font-sans md:text-base text-xs'>{snapshotQuestion} ?</p>
                                                            </div>
                                                            <div className='pb-3'>
                                                                {snapshotAnswer === snapshotClickedOption ? (
                                                                    <>
                                                                        <button className='font-sans text-sm md:text-base rounded-md text-green-500 p-1 font-thin border flex items-center justify-center px-3'><p className='bg-green-700 p-1 font-semibold font-sans rounded-full w-0 h-0 mr-2'></p>{snapshotClickedOption}</button>
                                                                    </>
                                                                ) : (
                                                                        <div className='flex'>
                                                                            <button className='font-sans text-sm md:text-base rounded-md text-red-500 p-1 font-thin border flex items-center justify-center px-3 mr-2'><p className='bg-red-700 p-1 font-semibold font-sans rounded-full w-0 h-0 mr-2'></p>{snapshotClickedOption}</button>
                                                                            <button className='font-sans text-sm md:text-base rounded-md text-green-500 p-1 font-thin border flex items-center justify-center px-3'><p className='bg-green-700 p-1 font-semibold font-sans rounded-full w-0 h-0 mr-2'></p>{snapshotAnswer}</button>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    })
                ) : (
                        <>
                            <div className='text-center text-3xl font-semibold font-sans mt-32'>Loading...</div>
                        </>
                    )}
            </div>
        </>
    )
}

export default QuizStat;