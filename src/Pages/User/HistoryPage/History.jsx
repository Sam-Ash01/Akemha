import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade'; // استيراد مكتبة الأنيميشن


// مكون ActivityCard
const ActivityCard = ({ activity }) => {
    return (
        <Fade bottom>
            <div className="relative group overflow-hidden rounded-lg shadow-lg text-right transform transition duration-500 ease-in-out hover:scale-105">
                <img
                    src={activity.image || '/Assets/Images/History/default-image-url.jpg'}
                    alt={activity.body}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute flex justify-start inset-0 bg-gradient-to-t from-[var(--secondary-color)] via-transparent to-transparent opacity-90 group-hover:opacity-95 transition duration-500 ease-in-out">
                    <div className="absolute bottom-0 p-4 text-right text-white">
                        <h3 className="text-xl font-bold mb-2">{activity.body}</h3>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

// مكون YearItem
const YearItem = ({ year, activities = [], isCurrentYear, onClick }) => {
    const [isOpen, setIsOpen] = useState(isCurrentYear);

    return (
        <div className="relative mb-12 text-right">
            <div className="relative flex items-center justify-end pr-16">
                <button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        onClick(year);
                    }}
                    className="text-2xl font-semibold text-gray-800 hover:text-[var(--primary-color)] transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                    {year}
                </button>
                <div className="absolute top-0 right-0 w-6 h-6 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                </div>
            </div>
            {isOpen && (
                <Fade cascade bottom>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-8 transition-opacity duration-500 ease-in-out opacity-100" style={{ direction: 'rtl' }}>
                        {Array.isArray(activities) && activities.map((activity, index) => (
                            <ActivityCard key={index} activity={activity} />
                        ))}
                    </div>
                </Fade>
            )}

        </div>
    );
};

// مكون History
const History = () => {
    const [currentYearActivities, setCurrentYearActivities] = useState([]);
    const [yearActivities, setYearActivities] = useState({});
    const [error, setError] = useState(null);

    const years = ['2024', '2023', '2022', '2021', '2020'];

    // جلب الأنشطة للعام الحالي عند التحميل
    useEffect(() => {
        const currentYear = new Date().getFullYear().toString();
        fetchActivities(currentYear);
    }, []);

    // دالة لجلب الأنشطة بناءً على السنة
    const fetchActivities = async (year) => {
        try {
            const response = await fetch('http://localhost:8000/api/showByYearHistory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                },
                body: JSON.stringify({ date: year }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 1 && result.data) {
                const activitiesArray = Object.values(result.data); // تحويل الكائن إلى مصفوفة
                setYearActivities(prevActivities => ({
                    ...prevActivities,
                    [year]: activitiesArray
                }));
                setError(null); // إعادة تعيين الخطأ إذا كانت البيانات ناجحة
            } else {
                // في حالة عدم وجود بيانات، نضبط الأنشطة على مصفوفة فارغة
                setYearActivities(prevActivities => ({
                    ...prevActivities,
                    [year]: []
                }));
                setError('No history items found.');
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
            // عرض البيانات الثابتة في حالة حدوث خطأ
            setYearActivities(prevActivities => ({
                ...prevActivities,
                [year]: []
            }));
            setError('Failed to fetch activities. Showing default data.');
        }
    };

    // التعامل مع النقر على السنة
    const handleYearClick = (year) => {
        fetchActivities(year);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 pt-24 relative text-right bg-[--primary-bg-color]">
            <h1 className="text-4xl font-extrabold text-center text-[var(--primary-color)] mb-4 animate__animated animate__fadeInDown">
                آخر الأخبار
            </h1>
            <h2 className="text-xl text-center text-gray-700 mb-16 animate__animated animate__fadeInUp">
                في هذا القسم، نستعرض الأنشطة السابقة والحالية التي قامت بها الجمعية الخيرية على مر السنين.
            </h2>
            <div className="relative">
                <div className="absolute right-10 top-0 bottom-0 w-1 bg-[var(--primary-color)]"></div>
                <div className="pr-8">
                    {years.map(year => (
                        <YearItem
                            key={year}
                            year={year}
                            activities={yearActivities[year] || []}
                            isCurrentYear={year === new Date().getFullYear().toString()}
                            onClick={handleYearClick}
                        />
                    ))}
                </div>
            </div>
            <div className="text-center mt-16">
                <Fade bottom>
                    <p className="text-3xl font-bold text-gray-900 p-4">
                        "حصيلة {years.length} سنوات من الحب"
                    </p>
                </Fade>
            </div>
        </div>
    );
};

export default History;
