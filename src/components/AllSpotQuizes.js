import React, { useEffect, useState } from 'react';
import { getSpotQuestions, deleteSpot } from '../apis/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import { Helmet } from 'react-helmet';

const AllSpotQuizes = () => {
    const navigate = useNavigate();
    const [spotQuiz, setSpotQuiz] = useState([])
    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }

        getSpotQuestions().then((response) => {
            setSpotQuiz(response.data)
            console.log(response.data);
        }).catch((error) => {
            toast.error(error.response.data.errorMessage, { theme: 'colored' })
        })
    }, [navigate]);


    const handleDeleteSpot = (id) => {
        deleteSpot(id)
            .then((response) => {
                toast.success(response.data.successMessage, { theme: "colored" })
            })
            .catch((error) => {
                toast.error(error.response.data.errorMessage, { theme: "colored" })
            })
    }

    const handleEditSpot = (id) => {
        navigate(`/editspot/${id}`);
    }
    return (
        <>
            <Helmet><title>Nimelssa Quiz | All SPOTS</title> </Helmet>
            <div className='w-11/12 mx-auto my-0 hidden lg:flex md:flex md:flex-col lg:flex-col'>
                {spotQuiz.length > 0 ? (
                    <div className='flex py-3 rounded-lg shadow-sm bg-yellow-500 my-3 px-2'>
                        <div className='w-1/12 text-center font-semibold text-white select-none md:text-sm'>No.</div>
                        <div className='w-5/12 text-center font-semibold text-white select-none md:text-sm'>Question</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none md:text-sm'>Option A</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none md:text-sm'>Option B</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none md:text-sm'>Option C</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none md:text-sm'>Option D</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none md:text-sm'>Answer</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none md:text-sm'>Actions</div>
                    </div>
                ) : (
                        <div className='font-semibold font-sans text-xl'>Loading...</div>
                    )}
                <div>
                    {spotQuiz && spotQuiz.map((singleStat, index) => {
                        const { _id, question, optionA, optionB, optionC, optionD, answer } = singleStat;
                        return (
                            <>
                                <div className='flex py-3 my-4 rounded-lg shadow-sm bg-gray-200 items-center md:pr-2'>
                                    <div className='w-1/12 text-center font-semibold select-none md:text-xs lg:text-base'>{index + 1}</div>
                                    <div className='w-5/12 text-center font-semibold select-none md:text-xs lg:text-base'>{question}</div>
                                    <div className='w-3/12 text-center font-semibold select-none md:text-xs lg:text-base'>{optionA}</div>
                                    <div className='w-3/12 text-center font-semibold select-none md:text-xs lg:text-base'>{optionB}</div>
                                    <div className='w-3/12 text-center font-semibold select-none md:text-xs lg:text-base'>{optionC}</div>
                                    <div className='w-3/12 text-center font-semibold select-none md:text-xs lg:text-base'>{optionD}</div>
                                    <div className='w-3/12 text-center font-semibold select-none md:text-xs lg:text-base'>{answer}</div>
                                    <div className='w-3/12 text-center'>
                                        <div onClick={() => { handleEditSpot(_id) }} className='md:text-xs lg:text-base md:w-full cursor-pointer border-2 text-center md:mx-0 md:py-1 mx-6 rounded-lg shadow-sm mb-2 text-green-500  font-semibold border-green-500'>Edit</div>
                                        <div onClick={() => { handleDeleteSpot(_id) }} className='md:text-xs lg:text-base md:w-full cursor-pointer border-2 text-center md:mx-0 md:py-1 mx-6 rounded-lg shadow-sm mt-2 text-red-500 font-semibold border-red-500'>Delete</div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

            {spotQuiz.length === 0 && (
                <>
                    <div className='flex justify-center items-center flex-col py-6 w-11/12 mx-auto my-0'>
                        <h1 className='text-center font-bold lg:text-5xl md:text-4xl'>No SPOT Questions are available.</h1>
                        <h1 className='text-center font-semibold lg:pt-2'>Please contact NIMELSSA academic team.</h1>
                    </div>
                </>
            )}

            <div className='lg:hidden flex w-11/12 mx-auto lg:hidden md:hidden'>
                {spotQuiz.length > 0 ? (
                    <div className='flex bg-yellow-500 w-full mt-3 rounded-lg shadow-sm'>
                        <div className='w-1/12 font-semibold text-white py-2 text-center pl-2 select-none '>No.</div>
                        <div className='w-7/12 font-semibold text-white py-2 text-center select-none '>Question</div>
                        <div className='w-4/12 font-semibold text-white py-2 text-center select-none '>Actions</div>
                    </div>
                ) : (
                    <div className='font-semibold font-sans text-xl'>Loading...</div>
                  )}
            </div>


            {spotQuiz && spotQuiz.map((singleStat, index) => {
                const { question, _id } = singleStat;
                return (
                    <>
                        <div className='lg:hidden flex w-11/12 mx-auto flex-wrap lg:hidden md:hidden'>
                            <div className='flex rounded-lg shadow-sm bg-gray-100 items-center justify-center my-3 py-2 px-2'>
                                <div className='w-1/12 text-center pr-2 select-none '>{index + 1}</div>
                                <div className='w-7/12 text-sm select-none '>{question}</div>
                                <div className='w-4/12 flex flex-col pl-2'>
                                    <div className=' select-none cursor-pointer border-2 text-center rounded-lg shadow-sm mb-2 text-green-500  font-semibold border-green-500' onClick={() => { handleEditSpot(_id) }}>Edit</div>
                                    <div className=' select-none cursor-pointer border-2 text-center rounded-lg shadow-sm mb-2 text-red-500  font-semibold border-red-500' onClick={() => { handleDeleteSpot(_id) }}>Delete</div>
                                </div>
                            </div>
                        </div>

                    </>
                )
            })}
        </>
    )
}

export default AllSpotQuizes;