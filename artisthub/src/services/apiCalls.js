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

export const LoginUser = async (user) => {
    try {
      const response = await fetch(`${url}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      /*if (!data.success) {
        throw new Error(data.message)
      }*/
      return data
    } catch (error) {
      console.log("Error al loguear el usuario", error)
      throw error
    }
  
  }

  export const getMyProfile = async (token) => {
    try {
      const response = await axios.get(`${url}user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// export const updateUserProfile = async (userId, userData, token, imageFile) => {
//     const formData = new FormData();
//     formData.append('name', userData.name);
//     formData.append('nick', userData.nick);
//     formData.append('biography', userData.biography);
//     formData.append('socialNetwork', userData.socialNetwork);
  
//     if (imageFile) {
//       formData.append('image', imageFile);
//     }
  
//     try {
//       const response = await axios.put(`${url}user/${userId}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
  
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error('Failed to update profile');
//       }
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };


export const updateUserProfile = async (token, userId, updateData) => {
  try {
    const response = await axios.put(`${url}user/users/${userId}`, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};