
//NO TOCAR CÓDIGO
////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import HeartButton from '../HeartButton/HeartButton.jsx';
// import { getPublicationById, likePublication, unlikePublication } from '../../services/apiCalls.js';

// const PublicationDetail = ({ closeDetail }) => {
//   const { id } = useParams();
//   const [publication, setPublication] = useState(null);
//   const [isLiked, setIsLiked] = useState(false); 
//   const token = useSelector((state) => state.user.token);

//   useEffect(() => {
//     const fetchPublication = async () => {
//       try {
//         const data = await getPublicationById(id);
//         if (data.likes) {
//           setIsLiked(data.likes.includes(token)); 
//         }
//         setPublication(data);
//       } catch (error) {
//         console.error('Error fetching publication:', error);
//       }
//     };

//     fetchPublication();
//   }, [id, token]);

//   const handleLikeClick = async () => { // Línea añadida: Función para manejar el click de like
//     if (!publication) return; // Asegúrate de que publication esté definido

//     try {
//       if (isLiked) {
//         await unlikePublication(token, id);
//         setPublication(prev => ({ ...prev, likes: prev.likes - 1 })); // Línea añadida: Disminuye el número de likes
//       } else {
//         await likePublication(token, id);
//         setPublication(prev => ({ ...prev, likes: prev.likes + 1 })); // Línea añadida: Aumenta el número de likes
//       }
//       setIsLiked(!isLiked); // Línea añadida: Cambia el estado de isLiked
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   return (
//     !publication ? <div>Loading...</div> :
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-60">
//       <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-lg max-h-full overflow-y-auto">
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
//             <HeartButton isLiked={isLiked} onClick={handleLikeClick} /> {/* Línea modificada: Pasar isLiked y handleLikeClick */}
//             <span className="ml-2">{publication.likes} likes</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicationDetail;


//NO TOCAR CÓDIGO
////////////////////////////////////////////////////////////////////////////////////////////////////
import './PublicationDetail.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPublicationById, likePublication, unlikePublication, addComment, getCommentsByPublicationId } from '../../services/apiCalls.js'
import HeartButton from '../HeartButton/HeartButton.jsx';
const PublicationDetail = ({ closeDetail }) => {
  const { id: publicationId } = useParams();
  const [publication, setPublication] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(""); 
  const [comments, setComments] = useState([]); 
  const [isCommentsVisible, setIsCommentsVisible] = useState(false); 
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublicationById(publicationId);
        console.log('Fetched publication data:', data); // Log publication data
        if (data.likes) {
          setIsLiked(data.likes.includes(userId)); // Asegúrate de usar userId aquí
        }
        setPublication(data);
      } catch (error) {
        console.error('Error fetching publication:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await getCommentsByPublicationId(publicationId);
        console.log('Fetched comments data:', data); // Log comments data
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPublication();
    fetchComments();
  }, [publicationId, userId]);

  const handleLikeClick = async () => {
    if (!publication) return;

    try {
      if (isLiked) {
        console.log('Unliking publication:', publicationId); // Log unliking action
        const response = await unlikePublication(token, publicationId);
        console.log('Unlike response:', response); // Log response from unlike API call
        setPublication(prev => {
          console.log('Updated publication after unlike:', { ...prev, likes: prev.likes - 1 });
          return { ...prev, likes: prev.likes - 1 };
        });
      } else {
        console.log('Liking publication:', publicationId); // Log liking action
        const response = await likePublication(token, publicationId);
        console.log('Like response:', response); // Log response from like API call
        setPublication(prev => {
          console.log('Updated publication after like:', { ...prev, likes: prev.likes + 1 });
          return { ...prev, likes: prev.likes + 1 };
        });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; 

    try {
      console.log('Submitting comment:', comment); // Log submitting comment
      const newComment = await addComment(token, publicationId, comment, userId);
      console.log('New comment:', newComment); // Log new comment
      setComments(prevComments => [...prevComments, newComment]); 
      setComment(""); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    !publication ? <div>Loading...</div> :
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={closeDetail}
          className="modal-close-button"
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
            <span className="ml-2">{publication.likes ? publication.likes.length : 0} likes</span> {/* Usar publication.likes.length */}
          </div>
          <div className="comment-section">
            <div className="comment-toggle" onClick={() => setIsCommentsVisible(!isCommentsVisible)}>
              {isCommentsVisible ? 'Hide Comments' : 'Show Comments'}
            </div>
            {isCommentsVisible && (
              <div>
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                    className="p-2 border border-gray-300 rounded"
                  />
                  <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
                </form>
                <div className="comment-list">
                  <h3 className="text-lg font-bold mt-4">Comments</h3>
                  {comments.length > 0 ? (
                    <ul>
                      {comments.map((comment, index) => (
                        <li key={index} className="mt-2">
                          <p>{comment.content}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;