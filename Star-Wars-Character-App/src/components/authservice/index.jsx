import axios from 'axios';

const authUrl = import.meta.env.VITE_APP_LOGIN_API_URL;

export const login = async (username, password) => {
    try {
        const { data } = await axios.post(authUrl, {
            username,
            password,
        });
        return data;
    } catch (error) {
        throw error;
    }
};
