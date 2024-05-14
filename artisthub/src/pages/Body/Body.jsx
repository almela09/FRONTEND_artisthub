import { Routes, Route } from "react-router-dom";
import { Register } from "../Register/Register";

export const Body = () => {
    return (
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post" element={<Home />} />
        <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    );
  };