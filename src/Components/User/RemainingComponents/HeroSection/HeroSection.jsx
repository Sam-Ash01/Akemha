import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroSection = () => {
  const slides = [
    {
      image: '/Assets/Images/HomeSection/img1.png',
      text: 'مساعدة الأسر المحتاجة',
      source: 'نعمل على تقديم الدعم الغذائي والمساعدة الطبية للأسر ذات الدخل المحدود. من خلال برامجنا، نقدم طرود غذائية وعيادات طبية مجانية لضمان حصولهم على الرعاية الأساسية.',
    },
    {
      image: '/Assets/Images/HomeSection/img2.jpg',
      text: 'فريقنا جاهز للإغاثة في الكوارث',
      source: 'فريقنا المدرب والمؤهل جاهز دائمًا للتدخل السريع وتقديم المساعدة الإنسانية في حالات الطوارئ والكوارث الطبيعية. من خلال التعاون مع الشركاء المحليين والدوليين، نقدم الإغاثة الفورية ونساهم في إعادة بناء المجتمعات المتضررة.'
    },
    {
      image: '/Assets/Images/HomeSection/img3.jpg',
      text: 'مساحة تشاركية',
      source: 'مساحاتنا التشاركية توفر بيئة ملهمة للتفاعل والتعاون بين الأفراد والمجموعات.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative w-full h-screen mx-auto "
      style={{
        backgroundImage: `url('/Assets/Images/HomeSection/bgHeroSec.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="pr-36 h-full w-full flex items-center justify-end">
        <div className="w-6/12 h-4/6">
          <img
            src={slides[currentIndex].image}
            alt="Slide Image"
            className="object-cover w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div
          className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/3 z-0 bg-white bg-opacity-60 p-10 shadow-lg w-2/5 h-2/5 text-right"
          style={{
            backdropFilter: 'blur(10px)', // Add blur effect
            WebkitBackdropFilter: 'blur(10px)', // For Safari support
          }}
        >
          <div className='flex items-center mb-4'>
            <div className='w-1/5 h-2 bg-[var(--primary-color)]'></div>
            <p className="text-gray-800 font-bold text-3xl ml-4">{slides[currentIndex].text}</p>
          </div>
          <p className="text-gray-600 text-xl">{slides[currentIndex].source}</p>
        </div>
      </div>

      <div className="absolute bottom-16 left-2/3 transform -translate-x-1/2 flex items-center pr-16">
        <span className="text-black text-l mr-4">
          {`0${currentIndex + 1}`}
        </span>
        <div className="flex items-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 transition-colors duration-100 ${index === currentIndex ? 'bg-[var(--secondary-color)]' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
        <span className="text-black text-l ml-4">
          {`0${slides.length}`}
        </span>

        <div className="absolute bottom-4 left-full flex items-center">
          <button
            onClick={prevSlide}
            className="bg-[var(--primary-bg-color)] text-[var(--secondary-color)] px-4 py-4 shadow-lg focus:outline-none transition-colors duration-300 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-bg-color)] active:bg-[var(--primary-color)]"
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={nextSlide}
            className="bg-[var(--primary-bg-color)] text-[var(--secondary-color)] px-4 py-4 shadow-lg focus:outline-none transition-colors duration-300 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-bg-color)] active:bg-[var(--primary-color)]"
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
