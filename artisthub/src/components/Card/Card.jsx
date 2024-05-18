import React from "react";
const Card = ({ id, title, description, imageUrl, onClick }) => {
  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
export default Card;
