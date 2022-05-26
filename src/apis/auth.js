import axios from 'axios';

export const signup = async (formData) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/signup', formData, config);
    return response;
}

export const signin = async (formData) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/signin', formData, config);
    return response;
}

export const forgot = async (formData) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/forgot', formData, config);
    return response;
}

export const createMcq = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/createMcq', formData, config);
    return response;
}

export const createTrueOrFalse = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/createTrueOrFalse', formData, config);
    return response;
}


export const createSpot = async (newFormData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/createSpot', newFormData, config);
    return response;
}

export const getAllUsers = async () => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/users/allUsers', config);
    return response;
}

export const deleteUser = async (id) => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.delete(`https://nimelssaquizapp.herokuapp.com/users/deleteUser/${id}`, config);
    return response;
}

export const getOneUser = async (id) => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get(`https://nimelssaquizapp.herokuapp.com/users/getUser/${id}`, config);
    return response;
}


export const updateUser = async (id, formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    
    const response = await axios.put(`https://nimelssaquizapp.herokuapp.com/users/updateUser/${id}`, formData, config);
    return response;
}


export const getQuestions = async () => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/questions', config);
    return response;
}

export const getTrueOrFalseQuestions = async () => {
    const config = {
    headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
    }
}
const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/trueOrFalseQuestions', config);
return response;
}


export const getSpotQuestions = async () => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/spotQuestions', config);
    return response;
}


export const postQuizStatistics = async (playerStats) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/quizStat', playerStats, config);
    return response;
}

export const postSpotQuizStatistics = async (playerStats) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/spotQuizStat', playerStats, config);
    return response;
}

export const getOneUserQuizStat = async (matric) => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get(`https://nimelssaquizapp.herokuapp.com/quiz/singleStat/${matric}`, config);
    return response;
}


export const getAdminMcqQuizStat = async () => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/allMcqStat', config);
    return response;
}


export const getAdminSpotQuizStat = async () => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/allSpotStat', config);
    return response;
}

export const getOneUserSpotQuizStat = async (matric) => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get(`https://nimelssaquizapp.herokuapp.com/quiz/singleSpotStat/${matric}`, config);
    return response;
}

export const questionCategory = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/category', formData, config);
    return response;
}

export const getAllCategories = async () => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/allCategories', config);
    return response;
}

export const resetPassword = async (formData) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/new_password', formData, config);
    return response;
}
export const deleteMcq = async (id) => {
        const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.delete(`https://nimelssaquizapp.herokuapp.com/quiz/deleteMcq/${id}`, config);
    return response;
}

export const deleteTrueOrFalse = async (id) => {
    const config = {
    headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
    }
}
const response = await axios.delete(`https://nimelssaquizapp.herokuapp.com/quiz/trueOrFalseQuestions/${id}`, config);
return response;
}

export const deleteSpot = async (id) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.delete(`https://nimelssaquizapp.herokuapp.com/quiz/deleteSpot/${id}`, config);
    return response;
}

export const getOneQuestion = async (id) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get(`https://nimelssaquizapp.herokuapp.com/quiz/getQuestion/${id}`, config);
    return response;
}


export const updateQuestion = async (id, formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    
    const response = await axios.put(`https://nimelssaquizapp.herokuapp.com/quiz/updateQuestion/${id}`, formData, config);
    return response;
}


export const getOneSpotQuestion = async (id) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get(`https://nimelssaquizapp.herokuapp.com/quiz/getSpotQuestion/${id}`, config);
    return response;
}

export const updateSpotQuestion = async (id, formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    
    const response = await axios.put(`https://nimelssaquizapp.herokuapp.com/quiz/updateSpotQuestion/${id}`, formData, config);
    return response;
}

export const comments = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/quiz/comments', formData, config);
    return response;
}

export const getAllComments = async () => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }

    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/quiz/allComments', config);
    return response;
}

export const getAllTestimonies = async () => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/users/allTestimonies', config);
    return response;
}


export const createTestimonies = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/createTestimonies', formData, config);
    return response;
}

export const approveMatric = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/approveMatric', formData, config);
    return response;
}

export const getAllMatrics = async () => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.get('https://nimelssaquizapp.herokuapp.com/users/allMatrics', config);
    return response;
}

export const confirmUser = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://nimelssaquizapp.herokuapp.com/users/oneUser', formData, config);
    return response;
}

export const handleCloudinaryPost = async (formData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        }
    }
    const response = await axios.post('https://api.cloudinary.com/v1_1/marquis/image/upload', formData, config);
    return response;
}

