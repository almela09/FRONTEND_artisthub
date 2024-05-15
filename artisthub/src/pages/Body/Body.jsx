import { Routes, Route } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import Profile from "../Profile/Profile";
export const Body = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
