import React, { useState } from 'react';

const Donation = () => {
  const [selectedChannel, setSelectedChannel] = useState('');

  const handleSelection = (event) => {
    setSelectedChannel(event.target.value);
  };

  const descriptions = {
    building: 'يمكن التبرع نقدياً وعينياً بالقدوم إلى مبنى مؤسسة عقمها الكائنة في دمشق، الشهبندر',
    // mtn: 'This channel supports donations through MTN mobile services.',
  };

  return (
    <div className='container mx-auto p-5 pr-[50px] text-right'>
      <div className="text-right mb-12 flex flex-col justify-end items-end">
        <div className='w-1/4 flex justify-end'>
          <div className='bg-gray-900 w-[60px] h-[2px] mt-5 mr-2'></div>
          <h1 className="text-3xl font-bold mb-2">قنوات التبرع</h1>
        </div>
        <p className="text-gray-700 text-lg">
          اختر الوسيلة الأنسب لك للتبرع ودعم مساعينا الإنسانية
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-evenly items-center md:px-16 px-8">
        <div className="flex items-center space-x-4">
          <div className="flex justify-center">
            <img
              src="Assets/Images/donation.jfif"
              alt=""
              className="w-[400px] h-[500px] border-8 border-[var(--secondary-color)]"
            />
          </div>
        </div>
        <div className="mt-8 md:mt-0 flex flex-col items-center md:items-end">
          <div className="flex space-x-12 mb-4">
            {/* Radio input for building */}
            <label
              className="cursor-pointer"
              style={{
                outline: selectedChannel === 'building' ? '4px solid var(--primary-color)' : 'none',
              }}
            >
              <input
                type="radio"
                name="donation-channel"
                value="building"
                className="hidden"
                onChange={handleSelection}
              />
              <img
                src="Assets/Images/building.svg"
                alt="building"
                className="w-32 h-32 shadow-lg"
              />
            </label>

            {/* Radio input for MTN */}
            <label
              className="cursor-pointer"
              style={{
                outline: selectedChannel === 'mtn' ? '4px solid var(--primary-color)' : 'none',
              }}
            >
              <input
                type="radio"
                name="donation-channel"
                value="mtn"
                className="hidden"
                onChange={handleSelection}
              />
              <img
                src="Assets/Images/mtn.svg"
                alt="MTN"
                className="w-32 h-32 shadow-lg"
              />
            </label>
          </div>

          {selectedChannel && (
            <div className="mt-4 text-gray-700 text-lg w-96">
              {descriptions[selectedChannel]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donation;
