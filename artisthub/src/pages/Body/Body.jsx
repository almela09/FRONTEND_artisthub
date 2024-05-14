import { Routes, Route } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";

export const Body = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
    </Routes>
  );
};
