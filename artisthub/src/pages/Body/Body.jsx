import { Routes, Route } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import Profile from "../Profile/Profile";
import { Home } from "../Home/Home";
import CreatePublication from "../../components/CreatePublication/CreatePublication";
export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-publication" element={<CreatePublication />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
