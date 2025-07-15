import React from 'react';

const Contact = () => {
  return (
    <div className="bg-[var(--primary-bg-color)] w-screen h-screen flex">

      {/* Left Section: Contact Description */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div 
          className="w-full max-w-md p-10 bg-[var(--primary-bg-color)] text-right"
          style={{ boxShadow: '0px 6px 6px rgba(0, 200, 156, 0.35)' }}
        >
          <h2 className="text-[#2f4f4f] font-bold text-3xl">
            تفاصيل عن عقمها
          </h2>
          <p className="text-gray-500 text-xl py-4">
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن يولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.
          </p>
          <p className="text-[var(--font-color)]">
            <strong>الموقع:</strong> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة
          </p>
          <p className="text-[var(--font-color)] py-4">
            <strong>الهاتف:</strong> 0954752212
          </p>
          <p className="text-[var(--font-color)]">
          dr.akemha@gmail.com<strong> :البريد </strong>
          </p>
        </div>
      </div>

      {/* Right Section: Contact Form */}
      <div className="w-1/2 flex flex-col justify-center items-end p-20 text-right mr-4">
        <h2 className="text-[var(--primary-color)] font-bold text-3xl mb-3">
        .. ابقى على تواصل 
        </h2>
        <h2 className="text-[var(--primary-color)] font-bold text-3xl mb-8">
        أخبرنا عما يجول في بالك
        </h2>
        <form className="w-full">
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="الاسم الاول"
              className="w-1/2 p-2 border border-gray-300 bg-[#e6e9db] mr-4 text-right"
            />
            <input
              type="text"
              placeholder="الاسم الثاني"
              className="w-1/2 p-2 border border-gray-300 bg-[#e6e9db] text-right"
            />
          </div>
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full p-2 border border-gray-300 bg-[#e6e9db] mr-4 text-right"
            />
            <input
              type="text"
              placeholder="الرقم"
              className="w-full p-2 border border-gray-300 bg-[#e6e9db] text-right"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="اكتب رسالتك لنا"
              className="w-full p-3 border border-gray-300 bg-[#e6e9db] h-32 text-right"
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white text-xl py-3 px-6 rounded-bl-3xl"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
