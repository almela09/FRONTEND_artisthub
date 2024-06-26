import "./PublicationDetail.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getPublicationById,
  likePublication,
  unlikePublication,
  addComment,
  getCommentsByPublicationId,
} from "../../services/apiCalls.js";
import HeartButton from "../HeartButton/HeartButton.jsx";
const PublicationDetail = ({ closeDetail, publicationIds }) => {
  const { id: publicationId } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublicationById(publicationId);
        
        if (data.likes) {
          setIsLiked(data.likes.includes(userId));
        }
        setPublication(data);
      } catch (error) {
        throw new Error('Error al obtener la publicación: ' + error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await getCommentsByPublicationId(publicationId);
        
        setComments(data);
      } catch (error) {
        throw new Error('Error al obtener los comentarios: ' + error.message);
      }
    };

    fetchPublication();
    fetchComments();
  }, [publicationId, userId]);

  const handleLikeClick = async () => {
    if (!publication) return;

    try {
      if (isLiked) {
        const response = await unlikePublication(token, publicationId);
        console.log("Unlike response:", response);
        setPublication((prev) => {
          console.log("Updated publication after unlike:", {
            ...prev,
            likes: prev.likes - 1,
          });
          return { ...prev, likes: prev.likes - 1 };
        });
      } else {
        console.log("Liking publication:", publicationId);
        const response = await likePublication(token, publicationId);
        console.log("Like response:", response);
        setPublication((prev) => {
          console.log("Updated publication after like:", {
            ...prev,
            likes: prev.likes + 1,
          });
          return { ...prev, likes: prev.likes + 1 };
        });
      }
      setIsLiked(!isLiked);
    } catch (error) {
       throw new Error('Error al cambiar el estado de "like": ' + error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      content: comment,
      userId: userId,
      createdAt: new Date().toISOString(),
    };

    try {
      
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");

      const response = await addComment(token, publicationId, comment, userId);
    } catch (error) {
      console.error("Error adding comment:", error);

      setComments((prevComments) =>
        prevComments.filter((c) => c !== newComment)
      );
    }
  };

  const handlePreviousClick = () => {
    if (!publicationIds) return;
    const currentIndex = publicationIds.indexOf(publicationId);
    if (currentIndex > 0) {
      navigate(`/publication/${publicationIds[currentIndex - 1]}`);
    }
  };

  const handleNextClick = () => {
    if (!publicationIds) return;
    const currentIndex = publicationIds.indexOf(publicationId);
    if (currentIndex < publicationIds.length - 1) {
      navigate(`/publication/${publicationIds[currentIndex + 1]}`);
    }
  };

  return !publication ? (
    <div>Loading...</div>
  ) : (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="modal-content bg-white rounded-lg max-w-4xl w-full mx-4 md:mx-0 md:flex relative">
        <button
          onClick={closeDetail}
          className="modal-close-button absolute top-0 right-0 mt-2 mr-2 text-black bg-white rounded-full p-1 shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          onClick={handlePreviousClick}
          className="modal-nav-button absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNextClick}
          className="modal-nav-button absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="w-full md:w-2/3">
          <img
            src={publication.image}
            alt={publication.title}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{publication.title}</h2>
            <p className="text-gray-600 mt-2">{publication.text}</p>
            <p className="mt-2 text-gray-800">By {publication.user.name}</p>
          </div>
          <div className="mt-4 flex items-center">
            <HeartButton isLiked={isLiked} onClick={handleLikeClick} />
            <span className="ml-2">
              {publication.likes ? publication.likes.length : 0} likes
            </span>
          </div>
          <div className="comment-section mt-4 flex-1 overflow-y-auto hide-scrollbar">
            <h3 className="text-lg font-bold">Comments</h3>
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
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-2 border border-gray-300 rounded resize-none max-h-40"
              rows="1"
              style={{ maxHeight: "10rem" }}
            />
            <button
              type="submit"
              className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;
