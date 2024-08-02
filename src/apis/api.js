// import axios from "axios";

// const SERVER_IP = `localhost`;
// const SERVER_PORT = `8000`;
// const DEFAULT_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

// export const request = async (method, url, headers, data) => {
//     return await axios({
//         method,
//         url : `${DEFAULT_URL}${url}`,
//         headers,
//         data
//     }).catch(error => console.log(error));
// }
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const request = async (method, url, headers = {}, data = null) => {
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${url}`,
            headers,
            data,
        });
        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/predict/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};