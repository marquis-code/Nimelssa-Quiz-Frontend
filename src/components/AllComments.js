import React, { useEffect, useState } from 'react';
import { getAllComments } from '../apis/auth';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllComments = () => {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }

        getAllComments().then((response) => {
            setComments(response.data)
            console.log(response.data);
        }).catch((error) => {
            toast.error(error.response.data.errorMessage, { theme: 'colored' })
        })
    }, [navigate])
    return (
        <>
            <Helmet><title>Nimelssa Quiz | All comments</title> </Helmet>
            <div className='w-11/12 mx-auto my-0'>
                {comments.length > 0 ? (
                    <div className='flex py-3 rounded-lg shadow-sm bg-blue-500 mb-3'>
                        <div className='w-3/12 text-center font-semibold text-white'>No.</div>
                        <div className='w-3/12 text-center font-semibold text-white'>Date</div>
                        <div className='w-3/12 text-center font-semibold text-white'>Name</div>
                        <div className='w-3/12 text-center font-semibold text-white'>Matric</div>
                        <div className='w-3/12 text-center font-semibold text-white'>Level</div>
                        <div className='w-3/12 text-center font-semibold text-white'>Comments</div>
                    </div>
                ) : (
                    <div className='font-semibold font-sans text-xl text-center mt-16'>Loading...</div>
                )}
                <div>
                    {comments && comments.map((singleComment, index) => {
                        const { date, username, matric, level, comment } = singleComment;
                        return (
                            <>
                                <div className='flex py-3 my-4 rounded-lg shadow-sm bg-gray-200'>
                                    <div className='w-3/12 text-center font-semibold'>{index + 1}</div>
                                    <div className='w-3/12 text-center font-semibold'>{date}</div>
                                    <div className='w-3/12 text-center font-semibold'>{username}</div>
                                    <div className='w-3/12 text-center font-semibold'>{matric}</div>
                                    <div className='w-3/12 text-center font-semibold'>{level}</div>
                                    <div className='w-3/12 text-center font-semibold'>{comment}</div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AllComments;