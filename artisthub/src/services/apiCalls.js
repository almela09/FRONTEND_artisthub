import axios from 'axios';

const url = 'http://localhost:4000/api/'

export const registerUserApi = async (user) => {
    try {
      const response = await axios.post(`${url}auth/register`, user, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.log("Error al registrar el usuario", error);
      throw error;
    }
};