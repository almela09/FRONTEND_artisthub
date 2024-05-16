import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getPublicationById, likePublication, unlikePublication, addComment } from '../../services/publicationService';
 //APICALLS ACUERDATE DE CAMBIARLO
const PublicationDetail = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const publicationData = await getPublicationById(token, id);
        setPublication(publicationData);
        setLiked(publicationData.likes.includes(userId));
      } catch (error) {
        console.error('Error fetching publication:', error);
      }
    };

    fetchPublication();
  }, [token, id, userId]);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePublication(token, id);
      } else {
        await likePublication(token, id);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking/unliking publication:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await addComment(token, id, comment);
      setPublication({
        ...publication,
        comments: [...publication.comments, newComment]
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!publication) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg max-w-2xl w-full">
        <img src={publication.image} alt={publication.title} className="w-full h-96 object-cover rounded-t-lg" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{publication.title}</h1>
          <p className="text-gray-700 mb-4">{publication.description}</p>
          <p className="text-gray-500 mb-4">By: {publication.creator.name}</p>
          <div className="flex items-center mb-4">
            <button
              onClick={handleLike}
              className={`px-4 py-2 rounded ${liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {liked ? 'Unlike' : 'Like'}
            </button>
          </div>
          <div className="comments mb-4">
            <h2 className="text-2xl font-semibold mb-2">Comments</h2>
            {publication.comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Add a comment"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;
