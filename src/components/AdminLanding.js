import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated} from '../helpers/auth';
import { getAllUsers, getAllComments } from '../apis/auth';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import { FaUserCircle } from "react-icons/fa";


const AdminLanding = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        userEmail : '',
        academicLevel : '',
        userName : '',
        userMatric : ''
      })
  
      const {userMatric, userEmail, userName, academicLevel} = profileData;
      const [showProfileModal, setShowProfileModal] = useState(false);

      const ProfileModal = () => {
        return (
          <>
            <div className='w-11/12 mx-auto ml-3 z-50 md:w-6/12 md:ml-80 lg:ml-96 absolute rounded-lg shadow-sm bg-gray-100 py-2 border'>
            <div className='font-bold pl-3 font-sans text-gray-900'><h1>User Profile</h1></div>
                <div className='flex justify-between items-center py-2 px-3'>
                   <div className='font-semibold font-sans md:text-base text-sm'>Name:</div>
                   <div className='text-sm md:text-base'>{userName}</div>
                </div>
                <div className='flex justify-between items-center py-2 px-3'>
                   <div className='font-semibold font-sans md:text-base text-sm'>Matric No.:</div>
                   <div className='text-sm md:text-base'>{userMatric}</div>
                </div>
                <div className='flex justify-between items-center py-2 px-3'>
                   <div className='font-semibold font-sans md:text-base text-sm'>Email:</div>
                   <div className='text-sm md:text-base'>{userEmail}</div>
                </div>
                <div className='flex justify-between items-center py-2 px-3'>
                   <div className='font-semibold font-sans md:text-base text-sm'>Academic Level:</div>
                   <div className='text-sm md:text-base'>{academicLevel}</div>
                </div>
            </div>
          </>
        )
      }

    useEffect(() => {
        const { username, matric, level, email } = isAuthenticated();

    if (isAuthenticated().role !== 1) {
      navigate('/signin');
    } else {
       setProfileData({userEmail : email, academicLevel : level, userName : username, userMatric : matric})
    }
    }, [ navigate ]);


    const [usersData, setUsersData] = useState({
        users: [],
        comments: [],
        errorMsg: false,
        successMsg: false
    });

    const { users, comments } = usersData;

    useEffect(() => {
        getAllUsers()
            .then((response) => {
                setUsersData((prevState) => ({ ...prevState, users: response.data }))
            })
            .catch((error) => {
                setUsersData((prevState) => ({ ...prevState, errorMsg: toast.error(error.response.data.errorMessage, { theme: "colored" }) }));
            });
    }, [])


    useEffect(() => {
        getAllComments()
            .then((response) => {
                setUsersData((prevState) => ({ ...prevState, comments: response.data }))
            })
            .catch((error) => {
                setUsersData((prevState) => ({ ...prevState, errorMsg: toast.error(error.response.data.errorMessage, { theme: "colored" }) }));
            })
    }, [])

    return (
        <>
        <Helmet><title>Nimelssa Quiz | Admin dashboard</title> </Helmet>
        <div className='flex justify-between items-center px-2 my-4 lg:mx-16'>
          <div>
            {userName ? (
              <div className='font-sans font-semibold lg:text-2xl'><h1>Welcome, {userName}!</h1></div>
            ) : (
                <div className='font-serif font-thin text-2xl'><h1>Hello</h1></div>
              )}
          </div>
          <div className='cursor-pointer' onClick={() => {setShowProfileModal(!showProfileModal)}} ><FaUserCircle size={25} /></div>
        </div>

        
        {showProfileModal && <ProfileModal />}

            <div className='md:w-11/12 px-1 mx-auto my-0 flex'>
                <div className='shadow-sm border-2 rounded-lg w-full mt-3'>
                    <div className='bg-gray-200 pl-6 py-3 flex items-center'>
                        <img src='./statistics.svg' alt='' className='w-5 h-5 rounded-sm mr-1' />
                        <p className='font-semibold text-2xl text-green-900 font-sans select-none'>Admin Dashboard</p>
                    </div>
                    <div className='lg:flex md:p-3'>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6 '>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./create.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div> 
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='text-white font-semibold select-none text-center cursor-pointer py-2 px-3 rounded-full w-full shadow-sm bg-green-900' onClick={() => { navigate('/category') }}>Create Quiz categories</div>
                            </div>
                        </div>

                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./create.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='text-white font-semibold select-none text-center cursor-pointer py-2 px-3 rounded-full w-full shadow-sm bg-green-900' onClick={() => { navigate('/create-mcq') }}>Create Quizzes</div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:flex md:p-3'>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./create.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='w-full text-center text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full shadow-sm bg-green-900' onClick={() => { navigate('/createTestimony') }}>Publish Quiz Winners</div>
                            </div>
                        </div>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./create.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='w-full text-center text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full shadow-sm bg-green-900' onClick={() => { navigate('/create-spot') }}>Create SPOT Quizes</div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:flex md:p-3'>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./create.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='w-full text-center text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full shadow-sm bg-green-900' onClick={() => { navigate('/approve_matric') }}>Approve Matric numbers</div>
                            </div>
                        </div>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./quizList.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='w-full text-center text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full shadow-sm bg-green-900' onClick={() => { navigate('/allMatrics') }}>View all Approved Matrics</div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:flex md:p-3'>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./quizList.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='w-full text-center text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full shadow-sm bg-green-900' onClick={() => { navigate('/allMcqQuestions') }}>View MCQ Quizzes</div>
                            </div>
                        </div>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='./quizList.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 py-6 bg-gray-100 flex justify-between items-center'>
                                <div className='w-full text-center text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full shadow-sm bg-green-900' onClick={() => { navigate('/allSpotQuestions') }}>View SPOT Quizzes</div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:flex md:p-3'>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='././statistics.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>
                            </div>
                            <div className='p-3 bg-gray-100 py-6 flex justify-between items-center'>
                                <div className='text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full text-center shadow-sm bg-green-900 w-full' onClick={() => { navigate('/allMcq') }}>View MCQ Quizes Statistics</div>
                            </div>
                        </div>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 lg:my-0 my-6'>
                            <div className='bg-sky-600 rounded-sm flex justify-center items-center p-3'>
                                <div><img src='././statistics.svg' className='w-20 h-20 rounded-lg select-none' alt='icon' /></div>  
                            </div>
                            <div className='p-3 bg-gray-100 flex py-6 justify-between items-center'>
                                <div className='text-white font-semibold select-none cursor-pointer py-2 px-3 rounded-full text-center shadow-sm bg-green-900 w-full' onClick={() => { navigate('/allSpot') }}>View SPOT Quizzes statistics</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}

            <div className='md:w-11/12 px-1 mx-auto my-0 flex my-6'>
                <div className='shadow-sm border-2 rounded-lg w-full '>
                    <div className='bg-gray-200 pl-6 py-3 flex items-center'>
                        <img src='./statistics.svg' className='w-5 h-5  rounded-sm mr-1 select-none' alt='' />
                        <p className='font-semibold text-2xl text-green-900 font-sans select-none'>Overall statistics</p>
                    </div>
                    <div className='lg:flex md:p-3'>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 my-6 lg:my-0'>
                            <div className='bg-sky-600 rounded-sm flex justify-between items-center p-3'>
                                <div><img src='./users.svg' className='w-10 h-10 rounded-lg select-none' alt='icon' /></div>
                                <div>
                                    <p className='text-5xl text-white mb-2 select-none'>{users.length}</p>
                                    <p className='text-white font-semibold select-none cursor-pointer' onClick={() => { navigate('/users-list') }}>View users</p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-1/2 rounded-lg shadow-sm border-2 mx-2 md:mx-3 my-6 lg:my-0'>
                            <div className='bg-sky-600 rounded-sm flex justify-between items-center p-3'>
                                <div><img src='./comments.svg' className='w-10 h-10 rounded-lg select-none' alt='icon' /></div>
                                <div>
                                    <p className='text-5xl text-white mb-2 select-none'>{comments.length}</p>
                                    <p className='text-white font-semibold select-none cursor-pointer' onClick={() => { navigate('/allComments') }}>View comments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminLanding;