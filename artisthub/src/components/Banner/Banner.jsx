import './Banner.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oleo1 from '../../images/oleo1.png';
import cat from '../../images/cat.png';
const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : 0));
      }, 8000);
      return () => clearInterval(interval);
    }, []);
  
    const handleButtonClick = (slide) => {
      setCurrentSlide(slide);
    };
  
    const handleJoinUsClick = () => {
      navigate('/register');
    };
  
    return (
      <div className="sliderAx h-auto">
        <div className={`container mx-auto ${currentSlide === 0 ? '' : 'hidden'}`}>
          <div
            className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
            style={{ backgroundImage: `url(${cat})` }}
          >
            <div className="md:w-1/2">
              <p className="font-bold text-sm uppercase">Hello Artist!</p>
              <p className="text-3xl font-bold">Welcome to our great art community</p>
              <p className="text-2xl mb-10 leading-none">Sign up below</p>
              <button
                onClick={handleJoinUsClick}
                className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
              >
                Join Us!
              </button>
            </div>
          </div>
          <br />
        </div>
  
        <div className={`container mx-auto ${currentSlide === 1 ? '' : 'hidden'}`}>
          <div
            className="bg-cover bg-top h-auto text-white py-24 px-10 object-fill"
            style={{ backgroundImage: `url(${cat})` }} // Aquí puedes cambiar la imagen por otra si tienes más importadas
          >
            <p className="font-bold text-sm uppercase">Artist/Hub</p>
            <p className="text-3xl font-bold">Meet another artists like you</p>
            <p className="text-2xl mb-10 leading-none">Found a lot of inspiration!</p>
            <button
              onClick={handleJoinUsClick}
              className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
            >
              Join Us!
            </button>
          </div>
          <br />
        </div>
        <div className="flex justify-between w-12 mx-auto pb-2">
          <button
            id="sButton1"
            onClick={() => handleButtonClick(0)}
            className={`rounded-full w-4 p-2 ${currentSlide === 0 ? 'bg-purple-800' : 'bg-purple-400'}`}
          />
          <button
            id="sButton2"
            onClick={() => handleButtonClick(1)}
            className={`rounded-full w-4 p-2 ${currentSlide === 1 ? 'bg-purple-800' : 'bg-purple-400'}`}
          />
        </div>
      </div>
    );
  };
  
  export default Banner;