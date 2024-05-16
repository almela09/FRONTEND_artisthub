import { Routes, Route, useParams } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import Profile from "../Profile/Profile";
import CreatePublication from "../../components/CreatePublication/CreatePublication";
import PublicationDetail from "../../components/PublicationDetail/PublicationDetail.jsx";
import Home from "../Home/Home.jsx";
import { useNavigate } from "react-router-dom";
import React from 'react';

export const Body = () => {
  const navigate = useNavigate();

  const openDetail = (id) => {
    navigate(`/publication/${id}`);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home openDetail={openDetail} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-publication" element={<CreatePublication />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/publication/:id"
          element={<PublicationDetail closeDetail={() => navigate("/")} />}
        />
      </Routes>
    </>
  );
};