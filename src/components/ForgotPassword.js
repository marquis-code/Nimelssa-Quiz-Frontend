import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { showLoading } from '../helpers/loading';
import {forgot} from '../apis/auth';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        loading : false
    });
    const { email, loading } = user;

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(email)) {
            setUser({
                ...user, errorMsg: toast.warn("All fields are required", {theme: "colored"})
            });
        } else if (!isEmail(email)) {
            setUser({
                ...user, errorMsg: toast.warn("Invalid Email Address", {theme: "colored"})
            });
        } else {
            const { email } = user;
            const formData = { email}
            setUser({ ...user, loading: true });
            forgot(formData)
                .then((response) => {
                    setUser({ ...user, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"})});
                    navigate('/resetMessage');
                }).catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    };
    return (
        <>
        <Helmet><title>Nimelssa Quiz | Forgot password</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10 lg:m-0'>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-4xl font-serif select-none'>Dont Worry</h1>
                                <p className='font-semibold py-3 text-sm select-none'>We are here to help you recover your password. Enter the email address you used when you created your account and we'll send you instructions to reset your password.</p>
                            </div>
                          
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Email Address</label>
                                <input name='email' value={email} onChange={handleChange} placeholder='Enter your email address' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='email' />
                            </div>

                           

                            <div className='py-4 flex justify-between items-center'>
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

export default ForgotPassword;