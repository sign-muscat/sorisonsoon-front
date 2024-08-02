import axios from 'axios';

export const callCheckCorrect = (formData) => async dispatch => {
    try {
        const response = await axios.post('/api/check-correct', formData);
        dispatch({ type: 'game/CHECK_CORRECT', payload: response.data });
        return response;
    } catch (error) {
        console.error("Error checking the answer:", error);
    }
};
