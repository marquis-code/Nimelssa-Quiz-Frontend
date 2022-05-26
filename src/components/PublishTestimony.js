import React, { useState, useEffect } from 'react';
import { FaUserPlus } from "react-icons/fa";
import isEmpty from 'validator/lib/isEmpty';
import { toast } from 'react-toastify';
import { showLoading } from '../helpers/loading';
import { createTestimonies} from '../apis/auth';
import {isAuthenticated} from '../helpers/auth';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const PublishTestimony = () => {
    const navigate = useNavigate();
    const [testimonyData, setTestimonyData] = useState({
        username : '',
        NimelssaiteImage: null,
        level : '',
        comment : '',
        errorMsg: false,
        successMsg: false,
        loading: false
    });

    const { username, level, comment, NimelssaiteImage, loading } =  testimonyData;

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }
    }, [loading])

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setTestimonyData({
            ...testimonyData, [fieldName]: fieldValue
        });
    }

    const handleImage = (e) => {
        setTestimonyData({
            ...testimonyData, [e.target.name]: e.target.files[0]
        })
    }

    const resetInputField = () => {
        setTestimonyData((prevState) => ({...prevState,  username : '', NimelssaiteImage: null, level : '', comment : ''}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (NimelssaiteImage === null) {
            setTestimonyData({ ...testimonyData, errorMsg: toast.warn('Please select an image', { theme: "colored" }) });
        } else if (isEmpty(username) || isEmpty(level) || isEmpty(comment)) {
            setTestimonyData({ ...testimonyData, errorMsg: toast.warn('All fields information are required', { theme: "colored" }) });
        } else {
            const formData = new FormData();
            formData.append('username', username)
            formData.append('level', level)
            formData.append('comment', comment)
            formData.append('NimelssaiteImage', NimelssaiteImage)
            setTestimonyData({ ...testimonyData, loading: true });
            createTestimonies(formData)
                .then((response) => {
                    setTestimonyData({ ...testimonyData, loading: false, successMsg: toast.success(response.data.successMessage, { theme: "colored" }) });
                    resetInputField();
                }).catch((error) => {
                    setTestimonyData({ ...testimonyData, loading: false, errorMsg: toast.error(error.response.data.errorMessage, { theme: "colored" }) });
                })
        }
    }
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Publish story</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-7/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10  lg:m-0' noValidate>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-2xl font-serif select-none'>Publish NIMELSSA Quiz winners stories.</h1>
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Upload Nimelssaite image</label>
                                <input name='NimelssaiteImage' onChange={handleImage} className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='file' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Name of Nimelssaite</label>
                                <input name='username' value={username} onChange={handleChange} placeholder='Enter Full Name of Nimelssaite.' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Academic Level</label>
                                <select name='level' value={level} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                    <option >Select academic level </option>
                                    <option value='200'>200 Level</option>
                                    <option value='300'>300 Level</option>
                                    <option value='400'>400 Level</option>
                                    <option value='500'>500 Level</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Comment</label>
                                <textarea name='comment' value={comment} onChange={handleChange} placeholder='Enter Comment here...' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text'></textarea>
                            </div>

                            <div className='py-3'>
                                {loading ? (
                                    <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                ) : (
                                        <button className='w-full mt-3 font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Publish story!<span className='ml-1'> <FaUserPlus /></span></button>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='hidden lg:order-first lg:flex w-5/12'>
                    <img src='./mcq.jpg' alt='amby' className='w-full' />
                </div>
            </div>

        </>

    )
}

export default PublishTestimony;