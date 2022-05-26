import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from '../apis/auth';
import { showLoading } from '../helpers/loading';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import RegisterationHeader from './RegisterationHeader';

const SignIn = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        matric: '',
        password: '',
        errorMsg : '',
        successMsg : '',
        loading: false
    });
    const { matric, password, loading } = user;

    const [passwordShown, setPasswordShown] = useState(true);

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
      };

     useEffect(() => {
       if(isAuthenticated()) {
           navigate(-1);
       }
     }, [navigate])

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { matric, password } = user;
        if (isEmpty(matric) || isEmpty(password)) {
            setUser({ ...user, errorMsg: toast.warn('All fields are required', {theme: "colored"}) });
        } else if (matric.toString().length !== 9) {
            setUser({ ...user, errorMsg: toast.warn("Invalid Matric Number", {theme: "colored"}) });
        } else {
            setUser({ ...user, loading: true })
            const formData = { matric, password }
            signin(formData)
                .then((response) => {
                    console.log(response.data);
                    const { token, user } = response.data; 
                    setAuthentication(token, user);
                    if(isAuthenticated().role === 0) {
                        navigate('/user');
                    }else if(isAuthenticated().role === 1) {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                })
                .catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    }
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Login</title> </Helmet>
         <RegisterationHeader />
            <div className='flex md:w-8/12 w-11/12 mx-auto my-0 justify-center items-center md:pt-0'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center'>
                        <form autoComplete='off' onSubmit={handleSubmit} className='md:rounded-lg md:border lg:rounded-md lg:border md:shadow-sm md:px-4 lg:py-9 lg:m-0' noValidate>
                            <div className='flex flex-col justify-center lg:items-center'>
                                <h1 className='font-semibold text-xl text-center md:2xl lg:text-4xl font-sans select-none py-2'>Welcome Back :)</h1>
                                <p className='font-semibold lg:py-3 lg:text-sm text-xs text-gray-400 select-none text-center'>To keep connected with us please login to your account using your matric number and password.</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold text-sm lg:text-base'>Matric Number</label>
                                <input autoComplete='off' name='matric' value={matric} onChange={handleChange} placeholder='Enter your Matric number' className='outline-none border-2 w-full py-2 px-3 rounded-lg appearance-none' type='number' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold text-sm lg:text-base'>Password</label>
                                <input autoComplete='off' name='password' value={password} onChange={handleChange} placeholder='Enter your password' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type={passwordShown ? 'text' : 'password'} />
                                <i onClick={togglePasswordVisiblity} className='cursor-pointer relative -top-8 right-3 flex justify-end'>{passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill  />}</i>
                            </div>

                            <div className='py-3'>
                                {loading ? (
                                    <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                ) : (
                                        <button className='w-full font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300'>Login Now!<span className='ml-1'><FaSignInAlt /></span></button>
                                    )}
                            </div>
                            <div className='py-3 text-center text-sm font-thin text-gray-500 cursor-pointer font-serif select-none' onClick={() => { navigate('/forgot') }}>Forgot Password ?</div>
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

export default SignIn;