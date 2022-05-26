import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../helpers/auth';
import { getOneUserSpotQuizStat } from '../apis/auth';
import { toast } from 'react-toastify';
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import {Helmet} from 'react-helmet';

nfghlijfg




const SpotQuizStat = () => {
    const [quizData, setQuizData] = useState([]);
    useEffect(() => {
        const { matric } = isAuthenticated();
        getOneUserSpotQuizStat(matric)
            .then((response) => {
                setQuizData(response.data);
                console.log(response.data);
            }).catch((error) => {
                toast.error(error.response.data.errorMessage, { theme: 'colored' });
            })
    }, [])

    return (
        <>
        <Helmet><title>Nimelssa Quiz | SPOT statistics</title> </Helmet>
            <div className='w-11/12 mx-auto my-0'>
                {quizData && quizData.map((singleStat) => {
                    const { date, answeredQuestions, numberOfQuestions, score, correctAnswers, wrongAnswers, minutes, seconds } = singleStat;
                    const totalQuestions = numberOfQuestions;
                    const totalScore = score;
                    const result = (totalScore / totalQuestions) * 100;
                    const convertedNumber = Math.floor(result);
                    return (
                        <>
                            <div className='rounded-lg shadow-sm my-3 bg-green-100 p-3'>
                                <div className='px-10 rounded-lg shadow-sm border m-3 mb-6'>
                                    <div className='flex my-6'>
                                        <div className='w-2/12'>
                                            <div className='font-semibold mb-2'>Date Submitted :</div>
                                        </div>
                                        <div className='w-10/12 font-semibold text-gray-700 '>{date}</div>
                                    </div>

                                    <div className='flex my-6'>
                                        <div className='w-2/12'>
                                            <div className='font-semibold mb-2'>Overall score :</div>
                                            <div className='text-yellow-400 font-semibold'>{convertedNumber}%</div>
                                        </div>
                                        <div className='w-10/12 font-semibold text-gray-700 '>Marquis overall score is based on {numberOfQuestions} questions on the test. Marquis answered {correctAnswers} out of {numberOfQuestions} questions correctly resulting in an overall score of {convertedNumber}%</div>
                                    </div>

                                    <div className='flex my-6'>
                                        <div className='w-2/12'>
                                            <div className='font-semibold mb-2'>Questions :</div>
                                            <div className='text-yellow-400 font-semibold'>{numberOfQuestions} Questions</div>
                                        </div>
                                        <div className='w-10/12 font-semibold text-gray-700 '>Marquis answered {correctAnswers} out of the possible {numberOfQuestions} questions correctly and failed {wrongAnswers} questions.</div>
                                    </div>

                                    <div className='flex my-6'>
                                        <div className='w-2/12'>
                                            <div className='font-semibold mb-2'>Completion Time :</div>
                                            <div className='text-yellow-400 font-semibold'>{minutes} minutes and {seconds} seconds</div>
                                        </div>
                                        <div className='w-10/12 font-semibold text-gray-700 '>Marquis overall score is based on 21 questions on the test. Marquis answered 16 out of 21 questions correctly resulting in an overall score of {convertedNumber}%</div>
                                    </div>
                                </div>

                                <div>
                                    {answeredQuestions.map((singleAnswer, index) => {
                                        const { snapshotAnswer, snapshotClickedOption, snapshotQuestion, snapShotImage } = singleAnswer;
                                        return (
                                            <>
                                                <div className='px-10'>
                                                    <div className='border-b-2 border-gray-500 my-3'>
                                                        <div><img src={`/uploads/${snapShotImage}`} alt='questionImage' className='h-20 w-20 mb-1 object-cover rounded-lg shadow-sm' /></div>
                                                        <div className='flex items-center mb-2'>
                                                            <p className='mr-1'>{snapshotAnswer === snapshotClickedOption ? (<FcCheckmark />) : (<FcHighPriority />)}</p>
                                                            <p className='text-gray-700 mr-1'>{index + 1}.</p>
                                                            <p className='text-gray-500 uppercase'>{snapshotQuestion} ?</p>
                                                        </div>
                                                        <div className='pb-3'>
                                                            {snapshotAnswer === snapshotClickedOption ? (
                                                                <>
                                                                    <button className='text-green-500 p-1 font-thin border flex items-center justify-center px-3'><p className='bg-green-700 p-1 rounded-full w-0 h-0 mr-2'></p>{snapshotClickedOption}</button>
                                                                </>
                                                            ) : (
                                                                    <div className='flex'>
                                                                        <button className='text-red-500 p-1 font-thin border flex items-center justify-center px-3 mr-2'><p className='bg-red-700 p-1 rounded-full w-0 h-0 mr-2'></p>{snapshotClickedOption}</button>
                                                                        <button className='text-green-500 p-1 font-thin border flex items-center justify-center px-3'><p className='bg-green-700 p-1 rounded-full w-0 h-0 mr-2'></p>{snapshotAnswer}</button>
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
                })}
            </div>

            {!quizData || !quizData.length ? (
                <>
                    <div className='flex justify-center items-center flex-col py-6 w-11/12 mx-auto my-0'>
                        <h1 className='text-center font-bold lg:text-5xl md:text-4xl'>No SPOT Quiz Data are available.</h1>
                        <h1 className='text-center font-semibold lg:pt-2'>Please contact NIMELSSA academic team.</h1>
                    </div>
                </>
            ) : ''}
        </>
    )
}

export default SpotQuizStat;