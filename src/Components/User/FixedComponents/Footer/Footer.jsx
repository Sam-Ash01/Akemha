import React from 'react';
import { FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-screen bg-[#e6e9db] text-black p-4">
      <div className="container mx-auto flex flex-col items-center px-4">
        <div className="flex flex-col items-center">
          <img src="/Assets/Images/Logo(1).png" alt="Logo" className="w-36 mb-4" />
          <div className="flex space-x-4 py-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e6e9db] text-[var(--primary-color)] p-2 rounded-full border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[#e6e9db] transition-colors"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e6e9db] text-[var(--primary-color)] p-2 rounded-full border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[#e6e9db] transition-colors"
            >
              <FaYoutube className="text-xl" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e6e9db] text-[var(--primary-color)] p-2 rounded-full border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[#e6e9db] transition-colors"
            >
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>
        <div className='flex w-full mt-4'>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/3 pl-[25px]">
            <h2 className="text-xl mb-2 font-bold text-[var(--primary-color)]">العنوان</h2>
            <p className='text-right '>رقم الطريق، خلف وكالة</p>
            <p>فندق وقتا، مراكش، طانطان،</p>
          </div>
          <div className="flex flex-col items-center text-center lg:text-right lg:w-1/3">
            <h2 className="text-xl mb-2 font-bold text-[var(--primary-color)]">التواصل</h2>
            <p>+1-212-0000000</p>
            <p>unreal@outlook.com</p>
          </div>
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right lg:w-1/3 pr-[50px]">
            <h3 className="text-lg mb-2 font-bold text-[var(--primary-color)]">الحسابات البنكية</h3>
            <p>unrealemail@outlook.com</p>
            <p>unrealemail@outlook.com</p>
            <p className='text-gray-400 pt-4'>© 2024, عقمها</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
