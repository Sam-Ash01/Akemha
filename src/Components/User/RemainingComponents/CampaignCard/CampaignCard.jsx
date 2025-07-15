import React from 'react';
import './CampaignCard.css';
import { useNavigate } from 'react-router-dom';

const CampaignCard = ({
  imageSrc,
  title,
  description,
  startDate,
  endDate,
  currentAmount,
  targetAmount,
  currentprecentage
}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/donation-channels');
  };

  return (
    <div className="w-[300px] flex flex-col items-center justify-center text-right">
      <div className="campaign-card bg-white shadow-md h-full w-full max-w-lg">
        <img className="w-full" src={"http://localhost:8000" + imageSrc} alt={title} />
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right pr-4 pl-4 pt-4">{title}</h2>
        <p className="text-gray-600 text-right pr-4 pl-4">{description}</p>

        <div className="flex items-center justify-between w-full pr-4 pl-4 mt-2 font-bold">
          <p className="text-gray-600">{currentprecentage}%</p>
          <p className="text-gray-600">:التقدم</p>
        </div>

        <div className="relative w-full pr-4 pl-4 mb-4">
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-[var(--primary-color)] h-2 rounded mt-1"
              style={{ width: `${currentprecentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full pr-4 pl-4 font-bold">
          <div className="text-gray-600">:الهدف</div>
          <div className="text-gray-600">:المتبقي</div>
        </div>
        <div className="flex items-center justify-between w-full pr-4 pl-4">
          <div className="text-gray-600">{targetAmount}</div>
          <div className="text-gray-600">{currentAmount}</div>
        </div>
        <div className="flex items-center justify-between w-full pr-4 pl-4 pt-2 font-bold">
          <div className="text-gray-600">:الانتهاء</div>
          <div className="text-gray-600">:البدء</div>
        </div>
        <div className="flex items-center justify-between w-full pr-4 pl-4">
          <div className="text-gray-600">{startDate}</div>
          <div className="text-gray-600">{endDate}</div>
        </div>
        <button className="rounded-bl-3xl bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 mt-4 m-4"
          onClick={handleClick}
        >
          تبرع الآن
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
