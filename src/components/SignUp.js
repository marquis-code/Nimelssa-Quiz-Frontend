import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import {showLoading} from '../helpers/loading';
import {signup} from '../apis/auth';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import {Helmet} from 'react-helmet';
import RegisterationHeader from './RegisterationHeader';

const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        matric: '',
        email: '',
        level: '',
        password: '',
        successMsg : '',
        errorMsg : '',
        confirmPassword: '',
        loading: false
    });
    const { username, matric, level, email, password, confirmPassword, loading } = user;


    const [passwordShown, setPasswordShown] = useState(true);

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
      };


    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });   /* The reason why the field name is inj a bracket is because we want to access the property content of the event object */
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(username) || isEmpty(matric) || isEmpty(email) || isEmpty(password) || isEmpty(level)|| isEmpty(confirmPassword)) {
            setUser({
                ...user, errorMsg: toast.warn("All fields are required", {theme: "colored"})
            });
        } else if (!isEmail(email)) {
            setUser({
                ...user, errorMsg: toast.warn("Invalid Email Address",{theme: "colored"})
            });
        } else if (!equals(password, confirmPassword)) {
            setUser({
                ...user, errorMsg: toast.warn("Passwords do not match",{theme: "colored"})
            });
        } else if (matric.toString().length !== 9) {
            setUser({
                ...user, errorMsg: toast.warn('Invalid Matric Number',{theme: "colored"})
            })
        } else {
            const { username, matric, level, password, email } = user;
            const formData = { username, email, matric, password, level}
            console.log(formData)
            setUser({ ...user, loading: true });
            signup(formData)
                .then((response) => {
                    setUser({ ...user, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"}) });
                    navigate('/signin');
                }).catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    };
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Sign up</title> </Helmet>
         <RegisterationHeader />
            <div className='flex md:w-8/12 w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center'>
                        <form onSubmit={handleSubmit} className='lg:rounded-lg md:rounded-lg md:border md:shadow lg:border lg:shadow-sm py-5 md:px-4 lg:px-6 lg:m-0' noValidate autoComplete='off'>
                            <div className='white flex flex-col justify-center items-center'>
                                <h1 className='font-thin text-xl lg:text-2xl font-serif select-none'>Get started with your account.</h1>
                            </div>
                            <div className='lg:flex lg:space-x-3'>
                                <div className='flex flex-col w-full'>
                                    <label className='my-3 select-none font-semibold text-sm lg:text-base'>Name</label>
                                    <input name='username' value={username} onChange={handleChange} placeholder='Enter Full Name' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label className='my-3 select-none font-semibold text-sm lg:text-base'>Matric Number</label>
                                    <input autoComplete='off' name='matric' value={matric} onChange={handleChange} placeholder='Enter Matric Number' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='number' />
                                </div>
                            </div>

                            <div className='lg:flex lg:space-x-3'>
                                <div className='flex flex-col w-full'>
                                    <label className='my-3 select-none font-semibold text-sm lg:text-base'>Email Address</label>
                                    <input autoComplete='off' name='email' value={email} onChange={handleChange} placeholder='Enter Email Address' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='email' />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label className='my-3 select-none font-semibold text-sm lg:text-base'>Level</label>
                                    <select name='level' value={level} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                        <option className='font-semibold'>Select your level</option>
                                        <option value='200'>200 Level</option>
                                        <option value='300'>300 Level</option>
                                        <option value='400'>400 Level</option>
                                        <option value='500'>500 Level</option>
                                    </select>
                                </div>
                            </div>
                             
                             <div className='lg:flex lg:space-x-3'>
                                <div className='flex flex-col w-full'>
                                    <label className='my-3 select-none font-semibold text-sm lg:text-base'>Password</label>
                                    <input autoComplete='off' name='password' value={password} onChange={handleChange} placeholder='Enter your password' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type={passwordShown ? "text" : "password"} />
                                    <i onClick={togglePasswordVisiblity} className='cursor-pointer relative -top-8 right-3 flex justify-end'>{passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</i>
                                </div>
                                
                                <div className='flex flex-col w-full'>
                                    <label className='my-3 select-none font-semibold text-sm lg:text-base'>Confirm password</label>
                                    <input autoComplete='off' name='confirmPassword' value={confirmPassword} onChange={handleChange} placeholder='Confirm your password' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' />
                                    <i onClick={togglePasswordVisiblity} className='cursor-pointer relative -top-8 right-3 flex justify-end'>{passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</i>
                                </div>
                             </div>

                            <div className='mb-3'>
                                <p className='font-semibold text-xs text-gray-400 select-none'>Your password must be at least 8 characters long and must contain at least an uppercase letter, lowercase letter, a number and at least one non-alphanumeric symbol(e.g. #?!@$%^&*-) and must not contain spaces or emojis.</p>
                            </div>
                            <div className=''>
                                {loading ? (
                                <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                ) : (
                                  <button className='w-full font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-500 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300'>Get Started!<span className='ml-1'> <FaUserPlus /></span></button>              
                                )}
                            </div>
                            <p className='font-semibold select-none text-sm text-gray-400 text-center pt-4'>Already have an account ? <span className='cursor-pointer text-green-500 underline font-semibold' onClick={() => { navigate('/signin') }}>Log in</span></p>
                        </form>
                    </div>
                </div>
                <div className='hidden lg:order-first lg:flex w-6/12'>
                    <img src='./bg3.jpeg' alt='amby' className='w-full' />
                </div>
            </div>

        </>
    )
}

export default SignUp;