import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import { questionCategory } from '../apis/auth';
import { showLoading } from '../helpers/loading';
import { toast } from 'react-toastify';

const Category = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        category: '',
        errorMsg : '',
        successMsg : '',
        loading: false
    });
    const { category, loading } = user;

     useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }
     }, [navigate])

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { category } = user;
        if (isEmpty(category)) {
            setUser({ ...user, errorMsg: toast.warn('Question Category field is required', {theme: "colored"}) });
        } else {
            setUser({ ...user, loading: true });
            const formData = {category};
            questionCategory(formData)
                .then((response) => {
                    setUser({ ...user, category : '', loading : false});
                   toast.success(response.data.successMessage, {theme : 'colored'});
                })
                .catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    }
    return (
        <>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form autoComplete='off' onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10 lg:m-0' noValidate>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-4xl font-serif select-none'>Welcome Back :)</h1>
                                <p className='font-semibold py-3 text-sm select-none'>To keep connected with us please login with your personal information by matric number and password</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Question Category</label>
                                <input autoComplete='off' name='category' value={category} onChange={handleChange} placeholder='Enter your Question Category' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='py-3 text-right font-thin text-gray-500 cursor-pointer font-serif select-none' onClick={() => { navigate('/create-mcq') }}>return to create questions</div>

                            <div className='py-3'>
                                {loading ? (
                                    <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                ) : (
                                        <button className='w-full font-semibold py-2 bg-gradient-to-l from-sky-500 to-indigo-500 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Submit<span className='ml-1'><FaSignInAlt /></span></button>
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

export default Category;