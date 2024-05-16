// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { getPublicationById } from '../../services/apiCalls';

// const PublicationDetail = () => {
//   const { id } = useParams();
//   const [publication, setPublication] = useState(null);

//   useEffect(() => {
//     const fetchPublication = async () => {
//       try {
//         const data = await getPublicationById(id);
//         setPublication(data);
//       } catch (error) {
//         console.error('Error fetching publication:', error);
//       }
//     };

//     fetchPublication();
//   }, [id]);

//   if (!publication) return <div>Loading...</div>;

//   return (
//     <div className="publication-detail flex justify-center items-center h-screen bg-black bg-opacity-75">
//       <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
//         <img src={publication.image} alt={publication.title} className="w-full h-auto rounded-t-lg" />
//         <div className="p-4">
//           <h2 className="text-2xl font-bold">{publication.title}</h2>
//           <p className="text-gray-600 mt-2">{publication.text}</p>
//           <p className="mt-2 text-gray-800">By {publication.user.name}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicationDetail;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeartButton from '../HeartButton/HeartButton.jsx';
import { getPublicationById, likePublication, unlikePublication } from '../../services/apiCalls.js';

// const PublicationDetail = ({ closeDetail }) => {
//   const { id } = useParams();
//   const [publication, setPublication] = useState(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const token = useSelector((state) => state.user.token);

//   useEffect(() => {
//     const fetchPublication = async () => {
//       try {
//         const data = await getPublicationById(id);
//         setPublication(data);
//         setIsLiked(data.likes.includes(token)); // Ajusta según cómo almacenes los "likes"
//       } catch (error) {
//         console.error('Error fetching publication:', error);
//       }
//     };

//     fetchPublication();
//   }, [id, token]);

//   const handleLikeClick = async () => {
//     try {
//       if (isLiked) {
//         await unlikePublication(token, id);
//         setPublication({ ...publication, likes: publication.likes - 1 });
//       } else {
//         await likePublication(token, id);
//         setPublication({ ...publication, likes: publication.likes + 1 });
//       }
//       setIsLiked(!isLiked);
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   if (!publication) return <div>Loading...</div>;

//   return (
//     <div className="publication-detail fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
//       <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
//         <button
//           onClick={closeDetail}
//           className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         <img src={publication.image} alt={publication.title} className="w-full h-auto rounded-t-lg" />
//         <div className="p-4">
//           <h2 className="text-2xl font-bold">{publication.title}</h2>
//           <p className="text-gray-600 mt-2">{publication.text}</p>
//           <p className="mt-2 text-gray-800">By {publication.user.name}</p>
//           <div className="mt-4 flex items-center">
//             <HeartButton isLiked={isLiked} onClick={handleLikeClick} />
//             <span className="ml-2">{publication.likes} likes</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicationDetail;
const PublicationDetail = ({ id, closeDetail }) => {
  const [publication, setPublication] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublicationById(id);
        setPublication(data);
        setIsLiked(data.likes.includes(token)); // Ajusta según cómo almacenes los "likes"
      } catch (error) {
        console.error('Error fetching publication:', error);
      }
    };

    fetchPublication();
  }, [id, token]);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await unlikePublication(token, id);
        setPublication({ ...publication, likes: publication.likes - 1 });
      } else {
        await likePublication(token, id);
        setPublication({ ...publication, likes: publication.likes + 1 });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (!publication) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
        <button
          onClick={closeDetail}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={publication.image} alt={publication.title} className="w-full h-auto rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{publication.title}</h2>
          <p className="text-gray-600 mt-2">{publication.text}</p>
          <p className="mt-2 text-gray-800">By {publication.user.name}</p>
          <div className="mt-4 flex items-center">
            <HeartButton isLiked={isLiked} onClick={handleLikeClick} />
            <span className="ml-2">{publication.likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;