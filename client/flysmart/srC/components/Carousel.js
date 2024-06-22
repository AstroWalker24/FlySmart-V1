// src/components/Carousel.js

import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import c1 from '/Users/saivarunavadhuta/Desktop/FlySmart-V1/client/flysmart/src/components/images/c1.jpg';
import c2 from '/Users/saivarunavadhuta/Desktop/FlySmart-V1/client/flysmart/src/components/images/c2.jpg';
import c3 from '/Users/saivarunavadhuta/Desktop/FlySmart-V1/client/flysmart/src/components/images/c3.jpg';

const images = [c1, c2, c3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-white">
      <div className="relative w-10/12 h-5/6 bg-white shadow-xl rounded-lg overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            alt={`Slide ${index}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
      >
        <FaArrowAltCircleLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
      >
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

export default Carousel;
