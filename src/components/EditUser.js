import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {getOneUser, updateUser} from '../apis/auth';
import { FaUserPlus } from "react-icons/fa";
import isEmail from 'validator/lib/isEmail';
import {showLoading} from '../helpers/loading';
import { toast } from 'react-toastify';
import {isAuthenticated} from '../helpers/auth';
import {Helmet} from 'react-helmet';

const EditUser = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({
        username: '',
        matric: '',
        email: '',
        level: '',
        role : '',
        errorMsg: false,
        successMsg: false,
        loading: false
    });
    const { username, matric, level, email, role, loading } = user;

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }
        getOneUser(id)
        .then((response) => {
            const {username, matric, level, email, role} = response.data;

            setUser((prevState) => ({...prevState, username, matric, email, level, role}));
        })
        .catch((error) => {
            setUser((prevState) => ({...prevState, errorMsg : toast.error(error.response.data.errorMessage, {theme: "colored"})}));
        })
    }, []);
 
    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUser({ ...user, [fieldName]: fieldValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmail(email)) {
            setUser({
                ...user, errorMsg: toast.warn("Invalid Email Address", {theme: "colored"})
            });
        } else if (matric.toString().length !== 9) {
            setUser({
                ...user, errorMsg: toast.warn('Invalid Matric Number', {theme: "colored"})
            })
        } else {
            const { username, matric, level, role, email } = user;
            const formData = { username, email, matric, role, level}
            setUser({ ...user, loading: true });
                                                                          
            updateUser(id, formData)
                .then((response) => {
                    setUser({ ...user, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"}) }); 
                    // navigate('/users-list')
                }).catch((error) => {
                    setUser({ ...user, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    };

    return (
        <>
        <Helmet><title>Nimelssa Quiz | Edit users</title> </Helmet>
        <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
            <div className='lg:w-6/12 lg:order-last'>
                <div className='flex justify-center items-center lg:p-20'>
                    <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10  lg:m-0' noValidate>
                        <div className='white flex flex-col'>
                            <h1 className='font-thin text-2xl font-serif select-none'>Get started with Editing users data.</h1>
                        </div>
                        <div className='flex flex-col'>
                            <label className='my-3 select-none font-semibold'>Name</label>
                            <input name='username' value={username} onChange={handleChange} placeholder='Enter Full Name' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                        </div>

                        <div className='flex flex-col'>
                            <label className='my-3 select-none font-semibold'>Matric Number</label>
                            <input name='matric' value={matric} onChange={handleChange} placeholder='Enter Matric Number' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='number' />
                        </div>

                        <div className='flex flex-col'>
                            <label className='my-3 select-none font-semibold'>Email Address</label>
                            <input name='email' value={email} onChange={handleChange} placeholder='Enter Email Address' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='email' />
                        </div>

                        <div className='flex flex-col'>
                            <label className='my-3 select-none font-semibold'>Level</label>
                            <select name='level' value={level} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                <option className='default'>Select academic level</option>
                                <option value='200'>200 Level</option>
                                <option value='300'>300 Level</option>
                                <option value='400'>400 Level</option>
                                <option value='500'>500 Level</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label className='my-3 select-none font-semibold font-semibold'>Role</label>
                            <input name='role' value={role} onChange={handleChange} placeholder='Enter users role (0 or 1)' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='number' />
                        </div>

                        <div className='py-3'>
                            {loading ? (
                            <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                            ) : (
                              <button className='w-full font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Update User Info!<span className='ml-1'> <FaUserPlus /></span></button>              
                            )}
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

export default EditUser;