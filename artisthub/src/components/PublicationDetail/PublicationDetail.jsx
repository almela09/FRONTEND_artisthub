import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getPublicationById } from '../../services/apiCalls';

const PublicationDetail = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublicationById(id);
        setPublication(data);
      } catch (error) {
        console.error('Error fetching publication:', error);
      }
    };

    fetchPublication();
  }, [id]);

  if (!publication) return <div>Loading...</div>;

  return (
    <div className="publication-detail flex justify-center items-center h-screen bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
        <img src={publication.image} alt={publication.title} className="w-full h-auto rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{publication.title}</h2>
          <p className="text-gray-600 mt-2">{publication.text}</p>
          <p className="mt-2 text-gray-800">By {publication.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;