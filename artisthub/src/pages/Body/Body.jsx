import { Routes, Route } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import Profile from "../Profile/Profile";
import CreatePublication from "../../components/CreatePublication/CreatePublication";
import PublicationDetail from "../../components/PublicationDetail/PublicationDetail.jsx";
import Home from "../Home/Home.jsx";
export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-publication" element={<CreatePublication />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/publication/:id" element={<PublicationDetail />} />
    </Routes>
  );
};
