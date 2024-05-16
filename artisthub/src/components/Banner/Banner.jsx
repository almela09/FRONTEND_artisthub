import './Banner.css';
import React, { useState, useEffect } from 'react';


const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : 0));
      }, 8000);
      return () => clearInterval(interval);
    }, []);
  
    const handleButtonClick = (slide) => {
      setCurrentSlide(slide);
    };
  
    return (
      <div className="sliderAx h-auto">
        <div className={`container mx-auto ${currentSlide === 0 ? '' : 'hidden'}`}>
          <div
            className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80)' }}
          >
            <div className="md:w-1/2">
              <p className="font-bold text-sm uppercase">Services</p>
              <p className="text-3xl font-bold">Hello world</p>
              <p className="text-2xl mb-10 leading-none">Carousel with TailwindCSS and React</p>
              <a
                href="#"
                className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
              >
                Contact us
              </a>
            </div>
          </div>
          <br />
        </div>
  
        <div className={`container mx-auto ${currentSlide === 1 ? '' : 'hidden'}`}>
          <div
            className="bg-cover bg-top h-auto text-white py-24 px-10 object-fill"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }}
          >
            <p className="font-bold text-sm uppercase">Services</p>
            <p className="text-3xl font-bold">Hello world</p>
            <p className="text-2xl mb-10 leading-none">Carousel with TailwindCSS and React</p>
            <a
              href="#"
              className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
            >
              Contact us
            </a>
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
