import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {getOneQuestion, updateQuestion, getAllCategories} from '../apis/auth';
import { FaUserPlus } from "react-icons/fa";
import {showLoading} from '../helpers/loading';
import { toast } from 'react-toastify';
import isEmpty from 'validator/lib/isEmpty';
import {isAuthenticated} from '../helpers/auth';
import {Helmet} from 'react-helmet';

const EditMcq = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [questionData, setQuestionData] = useState({
        category: '',
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
    
    const { category, question, optionA, optionB, optionC, optionD, answer, loading } = questionData;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }

        loadCategories();
      }, [loading])

      const loadCategories = async () => {
        await getAllCategories()
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            toast.error(error.response.data.errorMessage, {theme : 'colored'});
        })
    }


    useEffect(() => {
        getOneQuestion(id)
        .then((response) => {
            const {category, question, optionA, optionB, optionC, optionD, answer} = response.data;

            setQuestionData((prevState) => ({...prevState, category, question, optionA, optionB, optionC, optionD, answer}));
        })
        .catch((error) => {
            setQuestionData((prevState) => ({...prevState, errorMsg : toast.error(error.response.data.errorMessage, {theme: "colored"})}));
        })
    }, []);
 
    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setQuestionData({ ...questionData, [fieldName]: fieldValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((isEmpty(category) || isEmpty(question) || isEmpty(optionA) || isEmpty(optionB) || isEmpty(optionC) || isEmpty(optionD) || isEmpty(answer))) {
            setQuestionData({
                ...questionData, errorMsg: toast.warn("All fields are required", {theme: "colored"})
            });
        }  else {
            const { category, question, optionA, optionB, optionC, optionD, answer } = questionData;
            const formData = { category, question, optionA, optionB, optionC, optionD, answer };
            console.log(formData);

            setQuestionData({ ...questionData, loading: true });
                                                                          
            updateQuestion(id, formData)
                .then((response) => {
                    setQuestionData({ ...questionData, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"}) });
                    navigate('/allMcqQuestions')
                }).catch((error) => {
                    setQuestionData({ ...questionData, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }
    };

    return (
        <>
        <Helmet><title>Nimelssa Quiz | Edit Mcq</title> </Helmet>
        <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
            <div className='lg:w-6/12 lg:order-last'>
                <div className='flex justify-center items-center lg:p-20'>
                <form onSubmit={handleSubmit} className='rounded-lg shadow-sm p-3 md:p-10  lg:m-0' noValidate>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-2xl font-serif select-none'>Edit Multiple Choice Questions(MCQ).</h1>
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
                                    <option className='default' disabled>Select Question's Answer</option>
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
                                        <button className='w-full mt-3 font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Update question!<span className='ml-1'> <FaUserPlus /></span></button>
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

export default EditMcq;