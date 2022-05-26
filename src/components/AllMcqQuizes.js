import React, { useEffect, useState } from 'react';
import { getQuestions, deleteMcq } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../helpers/auth';
import { Helmet } from 'react-helmet';

const AllMcqQuizes = () => {
    const navigate = useNavigate()
    const [mcqQuiz, setMcqQuiz] = useState([]);

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }

        getQuestions().then((response) => {
            setMcqQuiz(response.data)
            console.log(response.data);
        }).catch((error) => {
            toast.error(error.response.data.errorMessage, { theme: 'colored' })
        })
    }, [navigate]);

    const handleDeleteMcq = (id) => {
        deleteMcq(id)
            .then((response) => {
                toast.success(response.data.successMessage, { theme: "colored" })
            })
            .catch((error) => {
                toast.error(error.response.data.errorMessage, { theme: "colored" })
            })
    }

    const handleEditMcq = (id) => {
        navigate(`/editMcq/${id}`);
    }

    return (
        <>
            <Helmet><title>Nimelssa Quiz | All Mcq</title> </Helmet>
            <div className='w-11/12 mx-auto my-0  lg:flex-col hidden lg:flex'>
                {mcqQuiz.length > 0 ? (
                    <div className='flex py-3 rounded-lg shadow-sm bg-yellow-500 mb-3 mt-3'>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>No.</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Question</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Option A</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Option B</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Option C</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Option D</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Answer</div>
                        <div className='w-3/12 text-center font-semibold text-white select-none'>Actions</div>
                    </div>
                ) : (
                        <div className='font-semibold font-sans text-xl'>Loading...</div>
                    )}
                <div>
                    {mcqQuiz && mcqQuiz.map((singleStat, index) => {
                        const { _id, question, optionA, optionB, optionC, optionD, answer } = singleStat;
                        return (
                            <>
                                <div className='flex items-center py-3 my-4 rounded-lg shadow-sm bg-gray-200'>
                                    <div className='w-3/12 text-center font-semibold select-none'>{index + 1}</div>
                                    <div className='w-3/12 text-center font-semibold select-none'>{question}</div>
                                    <div className='w-3/12 text-center font-semibold select-none'>{optionA}</div>
                                    <div className='w-3/12 text-center font-semibold select-none'>{optionB}</div>
                                    <div className='w-3/12 text-center font-semibold select-none'>{optionC}</div>
                                    <div className='w-3/12 text-center font-semibold select-none'>{optionD}</div>
                                    <div className='w-3/12 text-center font-semibold select-none'>{answer}</div>
                                    <div className='w-3/12 text-center'>
                                        <div onClick={() => { handleEditMcq(_id) }} className='cursor-pointer border-2 text-center mx-6 rounded-lg shadow-sm mb-2 text-green-500  font-semibold border-green-500'>Edit</div>
                                        <div onClick={() => { handleDeleteMcq(_id) }} className='cursor-pointer border-2 text-center mx-6 rounded-lg shadow-sm mt-2 text-red-500 font-semibold border-red-500'>Delete</div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

            {mcqQuiz.length === 0 && (
                <>
                    <div className='flex justify-center items-center flex-col py-6 w-11/12 mx-auto my-0'>
                        <h1 className='text-center font-bold lg:text-5xl md:text-4xl'>No Mcq Questions are available.</h1>
                        <h1 className='text-center font-semibold lg:pt-2'>Please contact NIMELSSA academic team.</h1>
                    </div>
                </>
            )}

            {/* Mobile screen code */}
            <div className='lg:hidden flex w-11/12 mx-auto'>
                {mcqQuiz.length > 0 ? (
                    <div className='flex bg-yellow-500 w-full mt-3 rounded-lg shadow-sm'>
                        <div className='w-1/12 font-semibold text-white py-2 text-center pl-2 select-none '>No.</div>
                        <div className='w-7/12 font-semibold text-white py-2 text-center select-none '>Question</div>
                        <div className='w-4/12 font-semibold text-white py-2 text-center select-none '>Actions</div>
                    </div>
                ) : (
                    <div className='font-semibold font-sans text-xl text-center mt-16'>Loading...</div>
               )}
            </div>


            {mcqQuiz && mcqQuiz.map((singleStat, index) => {
                const { question, _id } = singleStat;
                return (
                    <>
                        <div className='lg:hidden flex w-11/12 mx-auto flex-wrap'>
                            <div className='flex rounded-lg shadow-sm bg-gray-100 items-center justify-center my-3 py-2 px-2'>
                                <div className='w-1/12 text-center pr-2 select-none '>{index + 1}</div>
                                <div className='w-7/12 text-sm select-none '>{question}</div>
                                <div className='w-4/12 flex flex-col pl-2'>
                                    <div className=' select-none cursor-pointer border-2 text-center rounded-lg shadow-sm mb-2 text-green-500  font-semibold border-green-500' onClick={() => { handleEditMcq(_id) }}>Edit</div>
                                    <div className=' select-none cursor-pointer border-2 text-center rounded-lg shadow-sm mb-2 text-red-500  font-semibold border-red-500' onClick={() => { handleDeleteMcq(_id) }}>Delete</div>
                                </div>
                            </div>
                        </div>

                    </>
                )
            })}
        </>
    )
}


export default AllMcqQuizes;