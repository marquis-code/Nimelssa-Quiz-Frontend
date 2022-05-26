import React, { useEffect, useState } from 'react';
import { getAllMatrics } from '../apis/auth';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllApprovedMatrics = () => {
    const [matrics, setMatrics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }

        getAllMatrics().then((response) => {
            setMatrics(response.data)
            console.log(response.data);
        }).catch((error) => {
            toast.error(error.response.data.errorMessage, { theme: 'colored' })
        })
    }, [navigate])
    return (
        <>
            <Helmet><title>Nimelssa Quiz | All approved matrics</title> </Helmet>
            <div className='w-11/12 mx-auto my-0 mt-3'>
                <div className='font-semibold text-green-900 rounded-lg shadow-sm py-3 px-3 my-3'>
                    <h1 className='text-2xl'>Approved Matric's</h1>
                    <p>List of all the matrics registered on the application</p>
                </div>
                {matrics.length > 0 ? (
                    <>
                        <div className='flex justify-between items-center py-3 rounded-lg shadow-sm bg-gray-200 mb-3'>
                            <div className='w-3/12 text-center select-none font-semibold text-green-900'>No.</div>
                            <div className='w-3/12 text-center select-none font-semibold text-green-900'>Matric</div>
                            <div className='w-3/12 text-center select-none font-semibold text-green-900'>Level</div>
                            <div className='w-3/12 text-center select-none font-semibold text-green-900 mr-3'>Actions</div>
                        </div>
                        <div>
                            {matrics && matrics.map((singleMatric, index) => {
                                const { matric, level } = singleMatric;
                                return (
                                    <>
                                        <div className='flex justify-between items-center py-3 border my-4 rounded-lg shadow-sm'>
                                            <div className='w-3/12 cursor-pointer select-none text-center font-semibold'>{index + 1}</div>
                                            <div className='w-3/12 cursor-pointer select-none text-center font-semibold'>{matric}</div>
                                            <div className='w-3/12 cursor-pointer select-none text-center font-semibold'>{level}</div>
                                            <div className='w-3/12 cursor-pointer select-none text-center text-red-500 font-semibold border border-red-500 py-2 mr-3 rounded-lg shadow-sm'>Delete</div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </>
                ) : (
                        <div className='font-semibold text-center font-sans text-3xl mt-20'>Loading...</div>
                    )}
            </div>
        </>
    )
}

export default AllApprovedMatrics;