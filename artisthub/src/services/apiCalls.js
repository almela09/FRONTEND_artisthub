import axios from 'axios';

const url = 'http://localhost:4000/api/'

export const registerUserApi = async (user) => {
  try {
    const response = await axios.post(`${url}auth/register`, user, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al registrar el usuario: " + error.message);
    
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
    
    return data
  } catch (error) {
    throw new Error("Error al loguear el usuario: " + error.message);
  }

}
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${url}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};
export const deleteUser = async (token, userId) => {
  try {
    const response = await axios.delete(`${url}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
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
    throw new Error('Error al obtener el perfil: ' + error.message);
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
    throw new Error('Error al actualizar el perfil: ' + error.message);
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
    throw new Error('Error al crear la publicación: ' + error.message);
  }
};

export const getUserPublications = async (token, userId) => {       
  try {
    const response = await axios.get(`${url}publication/publications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las publicaciones: ' + error.message);
  }
};

export const getAllPublicationsByUser = async (userId, token) => {     
  try {
    const response = await axios.get(`${url}publication/publications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw new Error('Error al obtener las publicaciones: ' + error.message);
  }
};

export const getAllPublications = async (token) => {
  try {
    const response = await axios.get(`${url}publication/publications`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data; 
  } catch (error) {
  
    throw new Error('Error al obtener todas las publicaciones: ' + error.message);
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
    throw new Error('Error al dar like a la publicación: ' + error.message);
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
    throw new Error('Error al quitar el like a la publicación: ' + error.message);
  }
};

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
    
    return response.data;
  } catch (error) {
    
    throw new Error('Error al obtener los comentarios: ' + error.message);
  }
};

export const getAllComments = async () => {
  try {
    const response = await axios.get(`${url}comment/`);
    return response.data.comments;
  } catch (error) {
    throw new Error('Error al obtener todos los comentarios: ' + error.message);
  }
};

export const getPublicationById = async (id) => {
  try {
    const response = await axios.get(`${url}publication/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la publicación: ' + error.message);
  }
};

export const deletePublication = async (token, publicationId) => {
  const response = await fetch(`/api/publications/${publicationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
export const updatePublication = async (token, publicationId, updateData) => {
  const response = await fetch(`/api/publications/${publicationId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: updateData
  });
  return response.json();
};



