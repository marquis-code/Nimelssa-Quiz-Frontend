import React, { useState, useEffect } from 'react';
import { FaUserPlus } from "react-icons/fa";
import isEmpty from 'validator/lib/isEmpty';
import { toast } from 'react-toastify';
import { showLoading } from '../helpers/loading';
import { createSpot, getAllCategories, handleCloudinaryPost } from '../apis/auth';
import {isAuthenticated} from '../helpers/auth';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
// import axios from 'axios';

const PublishSpot = () => {
    const [questionData, setQuestionData] = useState({
        category: '',
        imageUrl : '',
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: '',
        errorMsg: false,
        successMsg: false,
        loading: false
    });

    const { category, question, optionA, optionB, optionC, optionD, answer,loading, imageUrl } = questionData;
   const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }
        loadCategories();
    }, [loading, navigate])


    const loadCategories = async () => {
        await getAllCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data.errorMessage, { theme: 'colored' });
            })
    }

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setQuestionData({
            ...questionData, [fieldName]: fieldValue
        });
    }

    const resetInputField = () => {
        setQuestionData((prevState) => ({...prevState,  category :  '', question :  '', optionA :  '', optionB :  '', optionC :  '', optionD :  '', answer :  ''}))
    }

    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file === null) {
            setQuestionData({ ...questionData, errorMsg: toast.warn('Please select an image', { theme: "colored" })});
        } else if (isEmpty(question) || isEmpty(category) || isEmpty(optionA) || isEmpty(optionB) || isEmpty(optionC) || isEmpty(optionD) || isEmpty(answer)) {
            setQuestionData({ ...questionData, errorMsg: toast.warn('All fields information are required', { theme: "colored" }) });
        } else {
            setQuestionData({ ...questionData, loading : true });
            const formData = new FormData();
            formData.append('file', file)
            formData.append("upload_preset", "uploads")
            handleCloudinaryPost(formData).then((response) => {
                const {url} = response.data;
                setQuestionData({...questionData, imageUrl : url});
                let newFormData = {category, question, optionA, optionB, optionC, optionD, answer, imageUrl : url}
                console.log(newFormData);
                createSpot(newFormData)
                    .then((response) => {
                        setQuestionData({ ...questionData, loading: false, successMsg: toast.success(response.data.successMessage, { theme: "colored" }) });
                        resetInputField();
                    }).catch((error) => {
                        setQuestionData({ ...questionData, loading: false, errorMsg: toast.error(error.response.data.errorMessage, { theme: "colored" }) });
                    })
            }).catch((error) => {
               console.log(error.message)
               setQuestionData({ ...questionData, loading: false });
            })

            
        }
    }
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Create spot</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-7/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10  lg:m-0' noValidate>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-2xl font-serif select-none'>Create Multiple Choice Questions (SPOT).</h1>
                            </div>
                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Question Category</label>
                                <select name='category' value={category} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                    <option value=''>Select Question Category</option>
                                    {categories && categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.category}</option>
                                    ))}
                                </select>
                            </div>


                        <div className='flex flex-col'>
                            <label className='my-3 select-none font-semibold'>Upload SPOT image</label>
                            <input onChange={handleImageChange}  className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='file' />
                        </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Question</label>
                                <input name='question' value={question} onChange={handleChange} placeholder='Enter Question' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Option A</label>
                                <input name='optionA' value={optionA} onChange={handleChange} placeholder='Enter Option A' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Option B</label>
                                <input name='optionB' value={optionB} onChange={handleChange} placeholder='Enter Option B' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Option C</label>
                                <input name='optionC' value={optionC} onChange={handleChange} placeholder='Enter Option C' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none' font-semibold>Option D</label>
                                <input name='optionD' value={optionD} onChange={handleChange} placeholder='Enter Option D' className='outline-none border-2 w-full py-2 px-3 rounded-lg ' type='text' />
                            </div>

                            <div className='flex flex-col'>
                                <label className='my-3 select-none font-semibold'>Answer</label>
                                <select name='answer' value={answer} onChange={handleChange} className='outline-none border-2 w-full py-2 px-3 rounded-lg'>
                                    <option >Select Question's Answer</option>
                                    <option value={optionA}>Option A</option>
                                    <option value={optionB}>Option B</option>
                                    <option value={optionC}>Option C</option>
                                    <option value={optionD}>Option D</option>
                                </select>
                            </div>

                            <div className='py-3'>
                                {loading ? (
                                    <button className='w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l'>{showLoading()}</button>
                                ) : (
                                        <button className='w-full mt-3 font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Create Question!<span className='ml-1'> <FaUserPlus /></span></button>
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

export default PublishSpot;