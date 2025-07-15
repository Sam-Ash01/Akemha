import React, { useState, useEffect, useRef } from 'react';

// Achievement component
const Achievement = ({ value, label }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const animateValue = (finalValue, duration) => {
      let startValue = 0;
      const increment = Math.ceil(finalValue / (duration / 10));
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= finalValue) {
          clearInterval(timer);
          setCurrentValue(finalValue);
        } else {
          setCurrentValue(startValue);
        }
      }, 10);
    };

    animateValue(value, 2000); // 2 seconds
  }, [value]);

  return (
    <div className="space-y-8">
      <p className="text-4xl font-bold">{currentValue}</p>
      <p className="w-80 text-2xl">{label}</p>
    </div>
  );
};

// Achievements component
const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5, // Adjust this value as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const achievements = [
    { value: 500, label: 'عبوة أوكسجين تم توزيعها' },
    { value: 2520, label: 'مستفيد من الخدمات الصحية' },
    { value: 387, label: 'عائلة تم إعالتها' },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-screen h-96"
      style={{
        backgroundImage: `linear-gradient(#FFFFF280, #044438), url('/Assets/Images/HomeSection/img2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-center text-[var(--secondary-bg-color)]">
        <h2 className="text-5xl mb-12">إنجازاتنا</h2>
        <div className="w-full flex flex-row items-center justify-center space-x-10">
          {isVisible &&
            achievements.map((achievement, index) => (
              <Achievement key={index} value={achievement.value} label={achievement.label} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
