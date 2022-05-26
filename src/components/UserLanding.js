import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaUserCircle } from "react-icons/fa";

const UserLanding = () => {
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
      <div className='w-11/12 z-50 md:w-6/12 md:ml-80 lg:ml-96 absolute rounded-lg shadow-sm bg-gray-100 py-2 border'>
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

    if (isAuthenticated().role !== 0) {
      navigate('/signin');
    } else {
       setProfileData({userEmail : email, academicLevel : level, userName : username, userMatric : matric})
    }

  }, [navigate])

  const handleQuizNavigation = () => {
    if (isAuthenticated().role !== 0) {
      navigate('/signin');
    } else {
      navigate('/quizChoice');
    }
  }

  const handleStatNavigation = () => {
    if (isAuthenticated().role !== 0) {
      navigate('/signin');
    } else {
      navigate('/statChoice');
    }
  }

  return (
    <>
      <Helmet><title>Nimelssa Quiz | Dashboard</title> </Helmet>

      <div className='w-11/12 mx-auto my-0'>
        <div className='flex justify-between items-center px-2 my-4'>
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

        <div className='lg:flex justify-center items-center border rounded-lg shadow-sm p-3'>
          <div className='rounded-lg shadow-sm border md:mr-4 mb-6 lg:my-0'>
            <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./quiz.svg' className='h-20 w-20' alt='icon' /></div>
            <div className='p-3'>
              <p className='text-gray-700 font-bold py-3 text-center text-xl'>NIMELSSA Quiz</p>
              <p className='font-semibold text-gray-400 font-sans text-sm mg:text-base text-center py-1'>Here you can access quiz application. Click on the button below to begin.</p>
              <button className='bg-gradient-to-l from-green-900 to-green-900 hover:bg-gradient-to-r text-white  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 rounded-lg bg-gray-200 font-semibold w-full  my-3 py-3 text-center' onClick={handleQuizNavigation}>Attempt Quiz</button>
            </div>
          </div>

          <div className='rounded-lg shadow-sm border md:mr-4 my-6 lg:my-0'>
            <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./statistics.svg' className='h-20 w-20' alt='icon' /></div>
            <div className='p-2'>
              <p className='text-gray-700 font-bold text-center text-xl py-3 text-center'>Quiz Statistics</p>
              <p className='font-semibold font-sans text-gray-400 text-sm text-center py-3'>Here you can find access your quiz statistics. Click on the button below to view stats.</p>
              <button className='bg-gradient-to-l from-green-900 to-green-900 hover:bg-gradient-to-r text-white  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 rounded-lg bg-gray-200 font-semibold w-full  my-3 py-3 text-center' onClick={handleStatNavigation}>View Quiz statistics</button>
            </div>
          </div>

          <div className='rounded-lg shadow-sm border md:mr-4 my-6 lg:my-0'>
            <div className='bg-gray-200 p- py-9 bg-sky-600 flex justify-center items-center'><img src='./comments.svg' className='h-20 w-20' alt='icon' /></div>
            <div className='p-2'>
              <p className='text-gray-700 font-bold text-center text-xl py-3'>Comments && suggestions</p>
              <p className='font-semibold text-gray-400 font-sans text-sm text-center py-3'>Here you can make comments about the quiz and let us know what needs to be improved.</p>
              <button className='rounded-lg bg-gradient-to-l from-green-900 to-green-900 hover:bg-gradient-to-r text-white  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 font-semibold w-full  my-3 py-3 text-center' onClick={() => { navigate('/comments') }}>Make comments</button>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default UserLanding;