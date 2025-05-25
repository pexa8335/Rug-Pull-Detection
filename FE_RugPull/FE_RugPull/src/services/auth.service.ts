import axios from 'axios';
import type { LoginType, RegisterType } from '../type/register.type';
import { LOGIN, REGISTER, TOKEN } from '../constant/app.constant';
const authService = {
    async register(data : RegisterType){
        try {
            const response = await axios.post(`${REGISTER}`, data)
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },
    async token(data : LoginType){
        try {
            const response = await axios.post(`${TOKEN}`, data)
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },
    async login(accessToken: string) {
        try {
            const response = await axios.get(
            `${LOGIN}`,
            {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            }
            );
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
}
export default authService;