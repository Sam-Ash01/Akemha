import React, { useState } from 'react';

const testimonials = [
  {
    text: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. قد تم توليد هذا النص...",
    name: "محمد محمود",
    image: "/Assets/Images/Testimonials/user.png", // استبدل بالمسار الصحيح للصورة
  },
  {
    text: "نص آخر مثال لنص يمكن أن يستبدل في نفس المساحة...",
    name: "علي أحمد",
    image: "/Assets/Images/Testimonials/user.png", // استبدل بالمسار الصحيح للصورة
  },
  {
    text: "نص آخر مثال لنص يمكن أن يستبدل في نفس المساحة...",
    name: " محمد أحمد",
    image: "/Assets/Images/Testimonials/user.png", // استبدل بالمسار الصحيح للصورة
  },
  // أضف المزيد من الشهادات حسب الحاجة
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(4, 68, 56, 0.9), rgba(4, 68, 56, 0.9)), url('/Assets/Images/Testimonials/bg.png')`, backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='relative py-3 px-3'>
        <span className="text-5xl font-bold absolute top-0 left-0">“</span>
        <div className="text-3xl text-black font-bold mb-8 bg-[var(--primary-bg-color)] px-6 py-2 text-center">
          شكر خاص
        </div>
        <span className="text-5xl font-bold absolute bottom-3 right-0">”</span>

      </div>
      <div className="relative w-full max-w-xl flex justify-center items-center">
        {/* Previous Testimonial */}
        <div className="absolute left-0 transform -translate-x-1/2 p-6 w-64 h-64 flex flex-col items-center justify-center">
          <img
            src={testimonials[(current === 0 ? testimonials.length : current) - 1].image}
            alt={testimonials[(current === 0 ? testimonials.length : current) - 1].name}
            className="mb-4 rounded-full opacity-30 w-16 h-16"
          />
          <p className="text-gray-800 px-6">{testimonials[(current === 0 ? testimonials.length : current) - 1].text}</p>
          <p className="text-gray-800 mt-3 font-bold">{testimonials[(current === 0 ? testimonials.length : current) - 1].name}</p>
        </div>

        {/* Current Testimonial */}
        <div className="relative bg-[var(--primary-bg-color)] p-6 shadow-lg w-80 h-80 flex flex-col items-center justify-center">
          <img
            src={testimonials[current].image}
            alt={testimonials[current].name}
            className="mb-6 rounded-full w-16 h-16"
          />
          <p className="text-gray-600 text-lg text-center px-6">{testimonials[current].text}</p>
          <p className="text-gray-800 mt-6 font-bold">{testimonials[current].name}</p>
          <button onClick={handlePrev} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl">
            <svg width="60" height="60" viewBox="0 0 71 94" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.7241 66.4483L14.2758 47L33.7241 27.5518" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button onClick={handleNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl">
            <svg width="60" height="60" viewBox="0 0 71 94" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.2759 27.5517L56.7242 47L37.2759 66.4482" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        {/* Next Testimonial */}
        <div className="absolute right-0 transform translate-x-1/2 p-6 w-64 h-64 flex flex-col items-center justify-center">
          <img
            src={testimonials[(current + 1) % testimonials.length].image}
            alt={testimonials[(current + 1) % testimonials.length].name}
            className="mb-4 rounded-full opacity-30 w-16 h-16"
          />
          <p className="text-gray-800 px-6">{testimonials[(current + 1) % testimonials.length].text}</p>
          <p className="text-gray-800 mt-3 font-bold">{testimonials[(current + 1) % testimonials.length].name}</p>
        </div>
      </div>
      <button
            type="submit"
            className="bg-[var(--primary-bg-color)] text-[var(--font-color)] text-xl font-bold py-3 px-6 mt-10 rounded-bl-3xl"
          >
            تواصل معنا
          </button>

    </div>
  );
};

export default Testimonials;
