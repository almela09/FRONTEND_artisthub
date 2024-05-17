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

export const createNewPublication = async (token, publicationData) => {
  try {
    const response = await axios.post(`${url}publication`, publicationData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to create publication');
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const getUserPublications = async (token, userId) => {       //by ID 1 sola publicación
  try {
    const response = await axios.get(`${url}publication/publications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
};

export const getAllPublicationsByUser = async (userId, token) => {     //todas las publicaciones de un usuario por id
  try {
    const response = await axios.get(`${url}publication/publications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data; // Accede a los datos devueltos en la respuesta
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
};

export const getAllPublications = async (token) => {
  try {
    const response = await axios.get(`${url}publication/publications`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data; // Accede a 'data' que contiene las publicaciones
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
};
export const likePublication = async (token, id) => {
  try {
    const response = await axios.put(`${url}/publication/${id}/likes`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error liking publication:', error);
    throw error;
  }
};

export const unlikePublication = async (token, id) => {
  try {
    const response = await axios.delete(`${url}/publication/${id}/dislike`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error unliking publication:', error);
    throw error;
  }
};
// export const addComment = async (token, publicationId,userId, content) => {  //AÑADIDO userId
//   try {
//     console.log('Data being sent:', { content, publicationId, userId }); 
//     const response = await axios.post(`${url}comment/`, { content, publicationId, userId }, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data.comment;
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     throw error;
//   }
// };

// export const createAndLogComment = async () => {
//   const token = 'your_jwt_token';
//   const content = 'Este es mi comentario';
//   const publicationId = '6644cd1a1f85fc62e0087eb4';
//   const userId = '663b95efdc35bbb8a2f0f56c';

//   console.log('Data being sent:', { token, publicationId, userId, content });

//   try {
//     const response = await axios.post(`${url}comment/`, { content, publicationId, userId }, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     const comment = response.data.comment;
    
//     console.log('Comment created:', comment);
//   } catch (error) {
//     console.error('Error creating comment:', error);
//   }
// };
export const addComment = async (token, publicationId, content) => {
  try {
    const response = await axios.post(`${url}comment/`, {
      content,
      publicationId,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error adding comment: ${error.response ? error.response.data.message : error.message}`);
  }
};

export const getCommentsByPublicationId = async (publicationId) => {
  try {
    const response = await axios.get(`${url}comment/${publicationId}`);
    console.log('Response data:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    console.log('Error data:', error.response.data); 
    throw error;
  }
};

// export const getAllComments = async () => {
//   try {
//     const response = await axios.get(`${url}comment/`);
//     return response.data.comments;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw error;
//   }
// };
export const getAllComments = async () => {
  try {
    const response = await axios.get(`${url}comment/`);
    return response.data.comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


export const getPublicationById = async (id) => {
  try {
    const response = await axios.get(`${url}publication/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching publication:', error);
    throw error;
  }
};