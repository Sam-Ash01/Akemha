import React, { useEffect, useState } from 'react'
import CampaignCard from '../../../Components/User/RemainingComponents/CampaignCard/CampaignCard.jsx';

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/index_fundraising', {
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

        setCampaigns(data.data || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchCampaigns();
  }, []);
  // const programs = [
  //   {
  //     imageSrc: "Assets/Images/program1.svg",
  //     title: "حملة 1",
  //     description:
  //       "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة, لقد تم توليد هذا النص من مولد النص العربي.",
  //     progress: 60,
  //     target: 1500000,
  //     raised: 600000,
  //   },
  //   {
  //     imageSrc: "Assets/Images/program1.svg",
  //     title: "حملة 2",
  //     description:
  //       "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة, لقد تم توليد هذا النص من مولد النص العربي.",
  //     progress: 60,
  //     target: 1500000,
  //     raised: 600000,
  //   },
  //   {
  //     imageSrc: "Assets/Images/program1.svg",
  //     title: "حملة 3",
  //     description:
  //       "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة, لقد تم توليد هذا النص من مولد النص العربي.",
  //     progress: 60,
  //     target: 1500000,
  //     raised: 600000,
  //   },
  // ];

  return (
    <div className="container mx-auto p-4 text-right">
      <div className="text-right mb-12 flex flex-col justify-end items-end pr-[30px]">
        <div className='w-1/4 flex justify-end'>
          <div className='bg-gray-900 w-[60px] h-[2px] mt-5 mr-2'></div>
          <h1 className="text-3xl font-bold mb-2">حملات التبرع</h1>
        </div>
        <p className="text-gray-700 text-lg">
          بتبرعك اليوم، تمنح الأمل لمن هم في أمس الحاجة إليه وتساهم في بناء
          مستقبل أفضل للجميع
        </p>
      </div>
      <div className='grid grid-cols-3 gap-8 pl-[70px]'>
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            imageSrc={campaign.photo}
            title={campaign.name}
            description={campaign.caption}
            startDate={campaign.start_date}
            endDate={campaign.end_date}
            currentAmount={campaign.goal - campaign.remaining_amount}
            targetAmount={campaign.goal}
            currentprecentage={campaign.current_percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;
