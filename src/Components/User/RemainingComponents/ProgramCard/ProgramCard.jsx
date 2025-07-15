import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgramCard.css'

const ProgramCard = ({ imageSrc, title, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/donation-channels');
  };

  return (
    <div className="program-card w-[230px] h-[400px] bg-[var(--primary-bg-color)] overflow-hidden shadow-lg">
      <img
        className="w-full h-[150px] object-cover"
        src={"http://localhost:8000" + imageSrc}
        alt={title}
      />
      <div className="p-3 text-right">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm">
          {description}
        </p>
        <button
          className="rounded-bl-3xl mt-2 text-white py-2 px-4 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]"
          onClick={handleClick}
        >
          تبرع الآن
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
