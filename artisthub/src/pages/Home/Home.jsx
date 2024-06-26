import "./Home.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllPublications } from "../../services/apiCalls.js";
import Card from "../../components/Card/Card.jsx";
import UpButton from "../../components/UpButton/UpButton.jsx";
import PublicationDetail from "../../components/PublicationDetail/PublicationDetail.jsx";
import Banner from "../../components/Banner/Banner.jsx";
const Home = ({ openDetail }) => {
  const [publications, setPublications] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const allPublications = await getAllPublications(token);
        setPublications(allPublications);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center mt-navbar">
      <div className="banner-container">
        <Banner className="banner-content" />
      </div>
      <div className="w-full max-w-6xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          All Publications
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {publications.map((publication) => (
            <Card
              key={publication._id}
              id={publication._id}
              title={publication.title}
              description={publication.description}
              imageUrl={publication.image}
              onClick={() => openDetail(publication._id)}
            />
          ))}
        </div>
      </div>
      <UpButton className="fixed bottom-4 right-4" />
    </div>
  );
};

export default Home;
