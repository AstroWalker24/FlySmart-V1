import React, { useState, useEffect } from 'react';

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide content to be displayed
  const slides = [
    "Ahmedabad terminal update: Starting April 9, 2024, all FlySmart domestic and international flights at Ahmedabad will now operate from Terminal 2, Sardar Vallabhbhai Patel International Airport.",
    "New Delhi terminal update: Starting April 9, 2024, all FlySmart domestic and international flights at New Delhi will now operate from Terminal 2, Indira Gandhi International Airport.",
    "Mumbai terminal update: Starting April 9, 2024, all FlySmart domestic and international flights at Mumbai will now operate from Terminal 2, Chhatrapati Shivaji Maharaj International Airport.",
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="relative w-full rounded-lg mt-10 max-w-4xl mx-auto bg-gray-900">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 bg-gray-900"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="p-4 bg-gray-900 text-red-50 text-center">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1 p-2 bg-gray-900 text-red-50"
      >
        &#9664;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1 p-2 bg-gray-900 text-red-50"
      >
        &#9654;
      </button>

      {/* Progress buttons */}
      <div className="flex justify-center mt-2 mb-2 pb-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 mx-1 rounded-full ${currentSlide === index ? 'bg-red-600' : 'bg-red-50'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
