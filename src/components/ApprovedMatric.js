import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import { approveMatric } from '../apis/auth';
import { showLoading } from '../helpers/loading';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';

const ApprovedMatric = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        matric: '',
        level : '',
        errorMsg : '',
        successMsg : '',
        loading: false
    });
    const { matric, level, loading } = user;

     useEffect(() => {
       if(isAuthenticated().role !== 1) {
           navigate('/signin');
       }
     }, [navigate])

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });
    }

    
    const resetInputField = () => {
        setUser((prevState) => ({...prevState, level : '',  matric : ''}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { matric, level } = user;
        if (isEmpty(matric) || isEmpty(level)) {
            setUser({ ...user, errorMsg: toast.warn('All fields are required', {theme: "colored"}) });
        } else if (matric.toString().length !== 9) {
            setUser({ ...user, errorMsg: toast.warn("Invalid Matric Number", {theme: "colored"}) });
        } else {
            setUser({ ...user, loading: true })
            const formData = { matric, level }
            approveMatric(formData)
                .then((response) => {
                   setUser({ ...user, loading: false, errorMsg: toast.success(response.data.successMessage, {theme: "colored"}) });
                   resetInputField();
                })
                .catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    }
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Approve matric</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center pt-3'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form autoComplete='off' onSubmit={handleSubmit} className='md:rounded-lg md:shadow-sm p-3 md:p-10 lg:m-0' noValidate>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-2xl md:text-4xl font-serif select-none'>Approve Matric</h1>
                                <p className='font-semibold py-3 text-sm select-none'>This is to help validate users that would be able to access the application.</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Matric Number</label>
                                <input autoComplete='off' name='matric' value={matric} onChange={handleChange} placeholder='Enter your Matric number' className='outline-none border-2 w-full py-2 px-3 rounded-lg appearance-none' type='number' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Level</label>
                                <select name='level' value={level} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                    <option className='font-semibold'>Select academic level</option>
                                    <option value='200'>200 Level</option>
                                    <option value='300'>300 Level</option>
                                    <option value='400'>400 Level</option>
                                    <option value='500'>500 Level</option>
                                </select>
                            </div>

                            <div className='py-3'>
                                {loading ? (
                                    <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                ) : (
                                        <button className='w-full font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Submit<span className='ml-1'><FaSignInAlt /></span></button>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='hidden lg:order-first lg:flex w-6/12'>
                    <img src='./login.jpg' alt='amby' className='w-full' />
                </div>
            </div>
        </>
    )
}

export default ApprovedMatric;