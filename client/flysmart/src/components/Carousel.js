import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import c1 from './images/c1.jpg';
import c2 from './images/c2.jpg';
import c3 from './images/c3.jpg';

const carouselItems = [
  {
    image: c1,
    caption: 'Explore the World with Our Top Destinations!',
  },
  {
    image: c2,
    caption: 'Limited Time Offer: Save Up to 50% on Flights!',
  },
  {
    image: c3,
    caption: 'Experience Luxury in the Sky!',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % carouselItems.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Slide changes every 3 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-900 overflow-hidden">
      <div className="relative w-10/12 h-5/6 bg-gray-900 shadow-xl rounded-lg overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              transitionDelay: index === currentIndex ? '0.5s' : '0s', // Delay transition for active slide
            }}
          >
            <img src={item.image} className="w-full h-full object-cover" alt={`Slide ${index}`} />
            {index === currentIndex && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 p-4 text-red-50">
                <h3 className="text-lg md:text-xl lg:text-4xl font-extrabold font-overlay-font text-center">{item.caption}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-red-50 text-3xl bg-gray-900 bg-opacity-50 p-2 rounded-full"
      >
        <FaArrowAltCircleLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-50 text-3xl bg-gray-900 bg-opacity-50 p-2 rounded-full"
      >
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

export default Carousel;
