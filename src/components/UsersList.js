import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import { isAuthenticated} from '../helpers/auth';

const UsersList = () => {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState({
        users: [],
        errorMsg: false,
        successMsg: false
    });

    const { users } = usersData;

    useEffect(() => {
        if (isAuthenticated().role !== 1) {
            navigate('/signin');
        }
        getAllUsers()
            .then((response) => {
                console.log(response.data)
                setUsersData((prevState) => ({ ...prevState, users: response.data }))
            })
            .catch((error) => {
                setUsersData((prevState) => ({ ...prevState, errorMsg: toast.error(error.response.data.errorMessage, { theme: "colored" }) }));
            })
    }, [navigate])

    const handleDeleteUser = (id) => {
        deleteUser(id)
            .then((response) => {
                setUsersData((prevState) => ({ ...prevState, successMsg: toast.success(response.data.successMessage, { theme: "colored" }) }))
            })
            .catch((error) => {
                setUsersData((prevState) => ({ ...prevState, errorMsg: toast.error(error.response.data.errorMessage, { theme: "colored" }) }))
            })
    }

    const handleEditUser = (id) => {
        navigate(`/editUser/${id}`);
    }
    return (
        <>
            <Helmet><title>Nimelssa Quiz | All users</title> </Helmet>
            <div className='w-11/12 mx-auto my-0'>
             {!users || !users.length ? (
                    <div></div>
                ) : (
                        <>
                            <div className='flex justify-around items-center py-3 lg:px-6 bg-yellow-500 rounded-lg shadow-sm mt-3'>
                                <div className='font-semibold text-white text-xs lg:text-base lg:w-2/12 flex justify-center items-center'>Name</div>
                                <div className='font-semibold text-white text-xs lg:text-base lg:w-2/12 hidden lg:flex flex justify-center items-center'>Matric</div>
                                <div className='font-semibold text-white text-xs lg:text-base lg:w-2/12 hidden md:flex flex justify-center items-center'>Level</div>
                                <div className='font-semibold text-white text-xs lg:text-base lg:w-2/12 flex justify-center items-center'>Role</div>
                                <div className='font-semibold text-white text-xs lg:text-base w-3/12 lg:w-2/12 flex justify-center items-center'>Actions</div>
                            </div>
                        </>
                    )}

                {users.length > 0 ? (
                    users.map((user) => {
                        const { _id, username, matric, role, level } = user;
                        return (
                            <>
                             <div key={_id} className='flex justify-around items-center lg:py-1 lg:px-6 my-3 bg-gray-100 rounded-lg py-1'>
                                <div className='lg:text-base font-semibold  lg:w-2/12 text-xs flex justify-center items-center'>{username}</div>
                                <div className='lg:text-base font-semibold lg:w-2/12 text-xs hidden lg:flex flex justify-center items-center'>{matric}</div>
                                <div className='lg:text-base font-semibold hidden md:flex lg:flex lg:w-2/12 text-xs md:text-center flex justify-center items-center'>{level}</div>
                                <div className='lg:text-base font-semibold lg:w-2/12 text-xs flex justify-center items-center'>{role === 0 ? 'User' : 'Admin'}</div>
                                <div className='font-semibold w-3/12 lg:w-2/12  flex-col flex justify-center items-center md:py-2 md:pr-2'>
                                    <div onClick={() => { handleEditUser(_id) }} className='font-semibold border-2 border-green-500 lg:py-2 lg:px-6 rounded-lg shadow-sm text-green-500 w-full text-xs flex justify-center items-center p-1 my-1 md:py-2 cursor-pointer'>Edit</div>
                                    <div onClick={() => { handleDeleteUser(_id) }} className='font-semibold border-2 border-red-500 lg:py-2 lg:px-6 rounded-lg shadow-sm text-red-500 w-full text-xs flex justify-center items-center p-1 my-1 md:py-2 cursor-pointer'>Delete</div>
                                </div>
                            </div>
                            </>
                        )
                    })
                ) : (
                    <div className='font-semibold text-center font-sans text-3xl mt-16'>Loading...</div>
                )}
            </div>
        </>
    )
}

export default UsersList;