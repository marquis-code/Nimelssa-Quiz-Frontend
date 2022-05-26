import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import isEmpty from 'validator/lib/isEmpty';
import {showLoading} from '../helpers/loading';
import {comments} from '../apis/auth';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';

const Comments = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        matric: '',
        level: '',
        comment: '',
        errorMsg : '',
        loading: false
    });
    const { username, matric, level, comment, loading } = user;

    const handleChange = (e) => {
        console.log(e);
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });   /* The reason why the field name is inj a bracket is because we want to access the property content of the event object */
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(username) || isEmpty(matric) || isEmpty(level) || isEmpty(comment)) {
            setUser({
                ...user, errorMsg: toast.warn("All fields are required", {theme: "colored"})
            });
        } else if (matric.toString().length !== 9) {
            setUser({
                ...user, errorMsg: toast.warn('Invalid Matric Number',{theme: "colored"})
            })
        } else {
            const {username, matric, level, comment } = user;
            const formData = {username, matric, level, comment}
            setUser({ ...user, loading: true });
            comments(formData)
                .then((response) => {
                    setUser({ ...user, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"}) });
                    navigate('/user');
                }).catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    };
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Publish comment</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10 lg:m-0' noValidate autoComplete='off'>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-2xl font-serif select-none'>Comments && Suggestions.</h1>
                                <p className='font-semibold select-none text-sm py-2'>Share your thoughts about the quiz application and our academic team will revert back to you.</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Name</label>
                                <input name='username' value={username} onChange={handleChange} placeholder='Enter Full Name' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Matric Number</label>
                                <input autoComplete='off' name='matric' value={matric} onChange={handleChange} placeholder='Enter Matric Number' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='number' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Comments && suggestions</label>
                                <textarea autoComplete='off' name='comment' value={comment} onChange={handleChange} placeholder='Enter your comments and suggestions here' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='textarea'></textarea>
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Level</label>
                                <select name='level' value={level} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                    <option className='default' disabled>Select academic level</option>
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
                                  <button className='w-full font-semibold py-2 bg-gradient-to-l from-sky-500 to-indigo-500 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Submit!<span className='ml-1'> <FaUserPlus /></span></button>              
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

export default Comments;