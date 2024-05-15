import React from 'react';
// export const Card = ({ title, description, imageUrl }) => {
//     return (
//       <div className="w-80 bg-white p-3 rounded shadow-md">
//         <img className="h-52 w-full object-cover rounded" src={imageUrl} alt={title} />
//         <h3 className="mt-3 text-lg font-semibold">{title}</h3>
//         <p className="mt-2 text-gray-600">{description}</p>
//       </div>
//     );
//   };
  
//   export default Card;



const Card = ({ imageUrl, title, description }) => {
  return (
    <div className="w-80 bg-white p-3 rounded shadow-md">
      <img className="h-52 w-full object-cover rounded" src={imageUrl} alt={title} />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default Card;