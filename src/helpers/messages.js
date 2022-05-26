import React from 'react';
import { toast } from 'react-toastify';

export const showErrorMessage = (errorMsg) => {
    return (
        <div>
            {toast(errorMsg)}
        </div>
    )
};

export const showSuccessMessage = (successMsg) => {
    return (
        <div className='py-2 text-center rounded-lg shadow-sm text-white font-semibold bg-green-500'>
            {toast(successMsg)}
        </div>
    )
};


export const showServerErrorMessage = (serverError) => {
    return (
        <div className='py-2 text-center rounded-lg shadow-sm text-white font-semibold bg-green-500'>
            {toast(serverError)}
        </div>
    )
};