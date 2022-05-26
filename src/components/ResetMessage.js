import React from 'react';
import {Helmet} from 'react-helmet';

const ResetMessage = () => {
    return (
        <>
         <Helmet><title>Nimelssa Quiz | Reset password</title> </Helmet>
            <div className='flex w-11/12 mx-auto my-0 justify-center items-center'>
                <div className='lg:w-6/12 lg:order-last'>
                    <div className='flex justify-center items-center lg:p-20'>
                        <div className='rounded-lg shadow-sm p-3 md:p-10 lg:m-0'>
                            <div className='white flex flex-col'>
                                <h1 className='font-thin text-4xl font-serif select-none'>Recover password</h1>
                                <p className='font-semibold py-3 text-sm select-none'>A mail has been sent to your email address.</p>
                                <p className='font-semibold py-3 text-sm select-none'>please click on ther link when you get the email and follow the instructions to reset your password.</p>
                            </div>
                          
                           
                        </div>
                    </div>
                </div>
                <div className='hidden lg:order-first lg:flex w-6/12'>
                    <img src='./login.jpg' alt='amby' className='w-full' />
                </div>
            </div>
        </>
    )
}

export default ResetMessage;