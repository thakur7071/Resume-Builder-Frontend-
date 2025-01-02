import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api/';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);
const GetUserResumes = (userEmail) => axiosClient.get(`/user-resumes?filters[userEmail][$eql]=${userEmail}`);
const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);
const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);
const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
