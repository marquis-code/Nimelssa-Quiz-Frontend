import React from 'react';
import {Helmet} from 'react-helmet';

const RedirectionMessage = () => {
    return (
        <>
        <Helmet><title>Nimelssa Quiz | Authentication Failed</title> </Helmet>
            <div className='py-16 flex flex-col items-center w-11/12 mx-auto my-0 rounded-lg shadow-sm border'>
                <h1 className='text-center text-3xl font-semibold select-none text-red-500'>Authorization denied!</h1>
                <p className='text-center text-lg py-3 font-semibold select-none'>Sorry you dont hace access to this page. Login to your account to gain access.</p>
                <p className='text-center text-lg py-3 select-none'>If you exprience issues please send us an email at nimelssaquiz@gmail.com</p>
            </div>
        </>
    )
}

export default RedirectionMessage;