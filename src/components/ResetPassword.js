import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import isEmpty from 'validator/lib/isEmpty';
import {resetPassword} from '../apis/auth';
import { showLoading } from '../helpers/loading';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import {Helmet} from 'react-helmet';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        password: '',
        loading : false
    });
    const { password, loading } = user;
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
      };

    const {token} = useParams();
    console.log(token);
    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(password)) {
            setUser({
                ...user, errorMsg: toast.warn("Password are required", {theme: "colored"})
            });
        } else {
            const { password } = user;
            const formData = { password, token}
            setUser({ ...user, loading: true });
            resetPassword(formData)
                .then((response) => {
                    setUser({ ...user, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"})});
                    navigate('/signin');
                }).catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    };
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Reset password</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10 lg:m-0'>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-4xl font-serif select-none'>Dont Worry</h1>
                                <p className='font-semibold py-3 text-sm select-none'>We are here to help you recover your password. Enter your new password.</p>
                            </div>

                            <div className='py-3'>
                                <p className='font-semibold text-xs select-none'>Your password must be atleast 8 characters long and must contain at least an uppercase letter, lowercase letter, a number and at least one non-alphanumeric symbol(e.g. !@) and must not contain spaces or emojis.</p>
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>New password</label>
                                <input autoComplete='off' name='password' value={password} onChange={handleChange} placeholder='Enter your new password' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type={passwordShown ? "text" : "password"} />
                                <i onClick={togglePasswordVisiblity} className='cursor-pointer relative -top-8 right-3 flex justify-end'>{passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</i>
                            </div>

                            <div className='py-4 flex justify-between'>
                               {
                                   loading ? (
                                    <button className='w-full mt-3 font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                   ) : (
                                    <button className='py-2 px-6 font-semibold bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center w-full'>Update password <span className='ml-1'><FaSignInAlt /></span></button>
                                   )
                               }
                            </div>
                        </form>
                    </div>
                </div>
                <div className='hidden lg:order-first lg:flex w-6/12'>
                    <img src={`/uploads/1647442503456.jpg`} alt='amby' className='w-full' />
                </div>
            </div>
        </>
    )
}

export default ResetPassword;