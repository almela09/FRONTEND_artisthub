import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createNewPublication } from './path/to/api'; // Asegúrate de actualizar el path a la ubicación correcta
import { useHistory } from 'react-router-dom';
import Spinner from './Spinner'; // Asegúrate de tener un componente Spinner o utiliza otro indicador de carga

const CreatePublication = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.token);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const publicationData = new FormData();
      publicationData.append('title', formData.title);
      publicationData.append('text', formData.text);
      if (formData.image) {
        publicationData.append('image', formData.image);
      }

      const response = await createNewPublication(token, publicationData);
      console.log('Publication created:', response);
      setLoading(false);
      history.push('/profile'); // Redirige a la página de perfil después de crear la publicación
    } catch (error) {
      console.error('Error creating publication:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-5">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-5">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-5 text-center">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create Publication
              </button>
              <button type="button" onClick={() => history.push('/profile')} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePublication;
