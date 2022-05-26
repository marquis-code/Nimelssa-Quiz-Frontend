import React, { useState, useEffect } from 'react';
import { FaUserPlus } from "react-icons/fa";
import isEmpty from 'validator/lib/isEmpty';
import { showLoading } from '../helpers/loading';
import { createMcq, getAllCategories } from '../apis/auth';
import { toast } from 'react-toastify';
import {isAuthenticated} from '../helpers/auth';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import QuestionTypeHeader from './QuestionTypeHeader';


const PublishMcq = () => {
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
    })

  const navigate = useNavigate();
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

    const handleChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setQuestionData({
            ...questionData, 
            [fieldName]: fieldValue
        });
    }

    const resetInputField = () => {
       setQuestionData((prevState) => ({...prevState,  category :  '', question :  '', optionA :  '', optionB :  '', optionC :  '', optionD :  '', answer :  ''}))
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(category) || isEmpty(question) || isEmpty(optionA) || isEmpty(optionB) || isEmpty(optionC) || isEmpty(optionD) || isEmpty(answer)) {
            setQuestionData({
                ...questionData, errorMsg: toast.warn("All fields are required", {theme: "colored"})
            });
        } else {
            const { category, question, optionA, optionB, optionC, optionD, answer } = questionData;
            const formData = { category, question, optionA, optionB, optionC, optionD, answer };
            console.log(formData);
            setQuestionData({ ...questionData, loading: true });
            createMcq(formData)
                .then((response) => {
                    setQuestionData({ ...questionData, loading: false, successMsg: toast.success(response.data.successMessage, {theme: "colored"}) });
                    resetInputField();
                }).catch((error) => {
                    setQuestionData({ ...questionData, loading: false, errorMsg: toast.error(error.response.data.errorMessage, {theme: "colored"}) });
                })
        }

    }

    return (
      <>
        <Helmet>
          <title>Nimelssa Quiz | Create mcq</title>{" "}
        </Helmet>
        <QuestionTypeHeader />
        <div className="flex md:w-8/12 mx-auto lg:w-full items-center">
          <div className="lg:w-6/12 w-full lg:order-last lg:mx-10"> 
            <div className="flex flex-col w-full">
            <form
             onSubmit={handleSubmit}
             className="md:rounded-lg md:border md:shadow-sm p-3 md:px-4 lg:px-5 lg:m-0"
             noValidate
           >
             <div className="flex flex-col">
               <h1 className="font-semibold text-xl lg:text-2xl font-sans select-none text-center">
                 Create Multiple Choice Questions(MCQ).
               </h1>
             </div>


             <div className='lg:flex lg:space-x-3 items-center  w-full'>
             <div className="flex flex-col w-full">
               <label className="my-2 select-none font-semibold text-sm lg:text-base">
                 Question Category
               </label>
               <select
                 name="category"
                 value={category}
                 onChange={handleChange}
                 className="outline-none border-2 py-2 px-3 rounded-lg"
               >
                 <option value="">Select Question Category</option>
                 {categories &&
                   categories.map((c) => (
                     <option key={c._id} value={c._id}>
                       {c.category}
                     </option>
                   ))}
               </select>
             </div>

             <div className="flex flex-col w-full">
                  <label className="my-2 select-none font-semibold text-sm lg:text-base">Answer</label>
                  <select
                    name="answer"
                    value={answer}
                    onChange={handleChange}
                    className="outline-none border-2 w-full py-2 px-3 rounded-lg"
                  >
                    <option>Select Question's Answer</option>
                    <option value={optionA}>Option A</option>
                    <option value={optionB}>Option B</option>
                    <option value={optionC}>Option C</option>
                    <option value={optionD}>Option D</option>
                  </select>
                </div>
             </div>
         
                <div className="flex flex-col w-full">
                  <label className="my-3 select-none font-semibold text-sm lg:text-base">
                    Question
                  </label>
                  <input
                    name="question"
                    value={question}
                    onChange={handleChange}
                    placeholder="Enter Question"
                    className="outline-none border-2 w-full py-2 px-3 rounded-lg "
                    type="text"
                  />
                </div>

            <div className='lg:flex lg:space-x-3 w-full'>
              <div className="flex flex-col w-full">
                <label className="my-3 select-none font-semibold text-sm lg:text-base">
                  Option A
                </label>
                <input
                  name="optionA"
                  value={optionA}
                  onChange={handleChange}
                  placeholder="Enter Option A"
                  className="outline-none border-2 w-full py-2 px-3 rounded-lg "
                  type="text"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="my-3 select-none font-semibold text-sm lg:text-base">
                  Option B
                </label>
                <input
                  name="optionB"
                  value={optionB}
                  onChange={handleChange}
                  placeholder="Enter Option B"
                  className="outline-none border-2 w-full py-2 px-3 rounded-lg "
                  type="text"
                />
              </div>
            </div>
            

            <div className='lg:first-line:flex lg:first-line:space-x-3 w-full'>
                <div className="flex flex-col w-full">
                  <label className="my-3 select-none font-semibold text-sm lg:text-base">
                    Option C
                  </label>
                  <input
                    name="optionC"
                    value={optionC}
                    onChange={handleChange}
                    placeholder="Enter Option C"
                    className="outline-none border-2 w-full py-2 px-3 rounded-lg "
                    type="text"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="my-3 select-none font-semibold text-sm lg:text-base">
                    Option D
                  </label>
                  <input
                    name="optionD"
                    value={optionD}
                    onChange={handleChange}
                    placeholder="Enter Option D"
                    className="outline-none border-2 w-full py-2 px-3 rounded-lg "
                    type="text"
                  />
                </div>
            </div>

             <div className="py-3">
               {loading ? (
                 <button className="w-full font-semibold py-2 bg-gray-200 text-white rounded-full shadow-sm flex justify-center items-center cursor-not-allowed bg-gradient-to-r from-yellow-400 to-white-500 hover:bg-gradient-to-l">
                   {showLoading()}
                 </button>
               ) : (
                 <button className="w-full mt-3 font-semibold py-2 bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r text-white rounded-full shadow-sm flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                   Create Question!
                   <span className="ml-1">
                     {" "}
                     <FaUserPlus />
                   </span>
                 </button>
               )}
             </div>
         
           </form>
            </div>
          </div>
          <div className="hidden lg:order-first lg:flex w-6/12">
            <img src="./bg3.jpeg" alt="amby" className='w-full' />
          </div> 
        </div>
      </>
    );
}

export default PublishMcq;