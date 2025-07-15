import React, { useEffect, useState } from 'react';
import './ProgramPage.css';
import ProgramCard from '../../../Components/User/RemainingComponents/ProgramCard/ProgramCard';

const ProgramPage = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/index_program', {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch programs');
        }

        const data = await response.json();
        console.log(data);

        setPrograms(data.data || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="bg-[#fcf9f3] min-h-screen p-8">
      <div className="text-right mb-12 flex flex-col justify-end items-end pr-[50px]">
        <div className="w-1/4 flex justify-end">
          <div className="bg-gray-900 w-[60px] h-[2px] mt-5 mr-2"></div>
          <h1 className="text-3xl font-bold mb-2">برامج التبرع</h1>
        </div>
        <p className="text-gray-700 text-lg">
          ساهم في رسم البسمة على وجوه المحتاجين، تبرع الآن وأضف فرحًا حقيقيًا في حياة الآخرين
        </p>
      </div>
      <div className="program-card-container grid grid-cols-4 gap-8 pl-[50px]">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            imageSrc={program.photo}
            title={program.name}
            description={program.caption}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramPage;
