import { frameData } from 'framer-motion';
import React, { useState , useEffect } from 'react';
import './VolunteerForm.css'
import { json } from 'react-router-dom';


const VolunteerForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        father_name: '',
        mother_name: '',
        address_id: '',
        phone_num: '',
        WhatsAPP_num: '',
        nationality: '',
        birth_date: '',
        has_physical_problems: '',
        volunteering_reasons: '',
        current_other_charities: '',
        courses_taken: '',
        potential_gains: '',
        // healthIssuesDescription: '',
        level_name: '',
        school: '',
        from: '',
        to: '',
        certificate: 'kjladsf',
        specialization: '',
        graduation_rate: '',
        organization: 'kjladsf',
        period :2,
        availableDays: [],
        role : 'تاتا',
        day_id: '',
        time_id: '',
        skills: '',
        // previousVolunteerExperience: '',
        // currentVolunteerExperience: '',
    });


    const nextStep = () => {
        setStep(prevStep => (prevStep < 4 ? prevStep + 1 : prevStep));
    };

    const prevStep = () => {
        setStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep));
    };


    const addresses = ['المرجة', 'الحميدية', 'الميدان', 'الشاغور', 'البرامكة', 'ركن الدين', 'الصالحية', 'المزة', 'المالكي', 'كفرسوسة', 'جرمانا', 'جوبر', 'القابون', 'برزة', 'ساحة الأمويين', 'باب توما', 'القصاع', 'باب شرقي', 'المهاجرين', 'العدوي', 'عش الورور', 'الربوة', 'لزاهرة', 'القدم', 'السبع بحرات', 'اليرموك', 'المزرعة', 'مساكن برزة', 'الحجر الأسود', 'السيدة زينب', 'جرمانا الجديدة', 'صحنايا', 'داريا', 'معضمية الشام', 'القصور', 'أبو رمانة', 'الشيخ محي الدين', 'التجارة', 'الجسر الأبيض', 'ساحة المرجة'
    ];

    const skills = ['التصوير', 'التفكير الابداعي', 'ادخال البيانات', 'التواصل', 'التصميم', 'التدريس', 'كتابة محتوى', 'مونتاج']

    const days = [
        'السبت',
        'الأحد',
        'الاثنين',
        'الثلاثاء',
        'الأربعاء',
        'الخميس',
    ];

    const options = ['صباحاً', 'بعد الظهر', 'مساءً', 'يوماً كاملاً'];

    const institutions = [
        "جامعة دمشق",
        "جامعة البعث",
        "جامعة حلب",
        "جامعة تشرين",
        "جامعة طرطوس",
        "جامعة حماة",
        "جامعة الفرات"
    ];
    const specializations = [
        "كلية الاقتصاد", "كلية التربية", "كلية الآداب والعلوم الإنسانية", "كلية الإعلام",
        "كلية الطب البشري", "كلية طب الأسنان", "كلية الصيدلة", "كلية الهندسة المعلوماتية",
        "كلية الهندسة الميكانيكية والكهربائية", "كلية العلوم التطبيقية", "كلية الهندسة التقنية",
        "كلية الهندسة المدنية", "كلية الهندسة المعمارية", "كلية العلوم", "كلية الحقوق",
        "كلية الشريعة", "كلية السياحة", "كلية العلوم السياسية", "كلية الزراعة", "كلية الفنون الجميلة",
        "معهد تقاني"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(formData)
        const formData1 = new FormData();
        formData1.append('email', formData['email']);
        formData1.append('password', formData['password']);
        formData1.append('password_confirmation', formData['password_confirmation']);
        formData1.append('first_name', formData['first_name']);
        formData1.append('last_name', formData['last_name']);
        formData1.append('father_name', formData['father_name']);
        formData1.append('mother_name', formData['mother_name']);
        formData1.append('address_id', formData['address_id']);
        formData1.append('phone_num', formData['phone_num']);
        formData1.append('WhatsAPP_num', formData['WhatsAPP_num']);
        formData1.append('nationality', formData['nationality']);
        formData1.append('birth_date', formData['birth_date']);
        formData1.append('has_physical_problems', (formData['has_physical_problems']) == 'yes'? 1: 0);
        formData1.append('volunteering_reasons', formData['volunteering_reasons']);
        formData1.append('current_other_charities', formData['volunteering_reasons']);
        formData1.append('courses_taken', formData['volunteering_reasons']);
        formData1.append('skills[]', formData['skills']);
        formData1.append('potential_gains', formData['volunteering_reasons']);
        formData1.append('level_name', formData['level_name']);
        formData1.append('school', formData['school']);
        formData1.append('from', formData['from']);
        formData1.append('to', formData['to']);
        formData1.append('certificate',  formData['certificate']);
        formData1.append('specialization', formData['specialization']);
        formData1.append('graduation_rate', formData['graduation_rate']);
        formData1.append('organization', 'hhhfh');
        formData1.append('period', '2');
        formData1.append('role', 'hfjhjhd');
        formData1.append('day_id', formData['day_id']);
        formData1.append('time_id', formData['time_id']);
        // Check the contents of formData1
        for (let [key, value] of formData1) {
            console.log(`${key}: ${value}`);
        }
        
        try {
        const response = await fetch('http://localhost:8000/api/volunteering', {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.api+json',
      
          },
          body: formData1,
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
            const data = await response.json();
            console.log('Form submitted successfully:', data);
        } catch (error) {
            console.error(error);
        }
    };




    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const prevAvailableDays = formData.availableDays || []; // Add this line
            setFormData((prevData) => ({
              ...prevData,
              availableDays: checked
                ? [...prevAvailableDays, value]
                : prevAvailableDays.filter((day) => day !== value),
            }));
        }  else if (type === 'radio') {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (type === 'number') {
            setFormData(prevData => ({
                ...prevData,
                [name]: Number(value)
            }));
        } else if (type === 'date') {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (name === 'skills') {
            setFormData(prevData => ({
                ...prevData,
                skills: value.split(',').map(skill => skill.trim())
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSkillChange = (index, event) => {
        const newSkills = [...formData.skills];
        newSkills[index] = event.target.value;
        setFormData({ ...formData, skills: newSkills });
    };


    return (
        <div className='pb-5'>
            <div className="text-center m-4 text-xl font-bold">
                تطوع معنا
            </div>
            <form className="bg-[var(--secondary-bg-color)] p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto ">
                <div className="flex justify-center mb-8 rtl flex-col">
                    <div className="flex pl-[150px] items-center  w-full max-w-lg ">
                        <div className="flex-1 flex items-center">
                            <div className={`w-6 h-6 rounded-full ${step >= 4 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'} mr-1`}></div>
                            <div className={`relative rounded-lg w-14  ${step >= 4 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'}`}>
                                <div className={`rounded-lg w-7 h-[7px] flex-1 ml-7 ${step >= 3 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'} `}></div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className={`w-6 h-6 rounded-full ${step >= 3 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'} mr-1`}></div>
                            <div className={`relative rounded-lg w-14 ${step >= 3 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'}`}>
                                <div className={`rounded-lg w-7 h-[7px] flex-1 ml-7 ${step >= 2 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'} `}></div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className={`w-6 h-6 rounded-full ${step >= 2 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'} mr-1`}></div>
                            <div className={`relative rounded-lg w-14 ${step >= 2 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'}`}>
                                <div className={`rounded-lg w-7 h-[7px] flex-1 ml-7 ${step >= 1 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'} `}></div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className={`w-6 h-6  rounded-full ${step >= 1 ? 'bg-[var(--primary-color)]' : 'bg-gray-300'}`}></div>
                        </div>

                    </div>
                    <div className='w-[400px] h-[1px] bg-gray-300 ml-[95px] mt-8'></div>
                </div>
                {step === 1 && (
                    <div>
                        <h2 className="text-right text-xl font-bold mb-4">معلومات شخصية</h2>
                        <form>
                            {/* <div className="flex items-center pl-[470px] pb-5">
                                <div className="border bg-[var(--secondary-bg-color)]">
                                    <label className="flex flex-col w-[136px] h-[36px] items-center shadow-lg tracking-wide uppercase border cursor-pointer">
                                        <span className="mt-2 text-base leading-normal text-xs text-gray-400">إدراج صورة توضيحية</span>
                                        <input type='file' className="hidden" />
                                    </label>
                                </div>
                            </div> */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        name="last_name"
                                        placeholder="الكنية"
                                        type="text"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right"
                                    />
                                </div>
                                <div>
                                    <input
                                        name="first_name"
                                        placeholder='الاسم'
                                        type="text"
                                        value={frameData.first_name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="mother_name"
                                        placeholder='اسم الأم'
                                        type="text"
                                        value={formData.mother_name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="father_name"
                                        placeholder='اسم الأب'
                                        type="text"
                                        value={formData.father_name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>

                                <div>
                                    <input
                                        name="email"
                                        placeholder='البريد'
                                        type="text"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="WhatsAPP_num"
                                        placeholder='رقم الواتساب'
                                        type="tel"
                                        value={formData.WhatsAPP_num}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="password_confirmation"
                                        placeholder='تأكيد كلمة السر'
                                        type="password"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="password"
                                        placeholder='كلمة السر'
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="phone_num"
                                        placeholder='رقم الهاتف'
                                        type="tel"
                                        value={formData.phone_num}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div>
                                    <input
                                        name="nationality"
                                        placeholder='الجنسية'
                                        type="text"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right" />
                                </div>
                                <div className="mb-4 text-right flex justify-end mt-1">
                                    <input
                                        name="birth_date"
                                        placeholder='تاريخ الولادة'
                                        type="date"
                                        value={formData.birth_date}
                                        onChange={handleInputChange}
                                        className="date-input  block w-full bg-[var(--secondary-bg-color)] block  w-full border-0 border-b focus:outline-none text-right" />
                                    <label
                                        onChange={handleInputChange}
                                        className="block text-gray-400 text-sm mt-2">
                                        تاريخ الولادة
                                    </label>
                                </div>
                                <div className="mb-4 text-right flex justify-end mt-1">
                                    <div className="relative pr-5 ">
                                        <select
                                            name="address_id"
                                            onChange={handleInputChange}
                                            value={formData.address_id}
                                            className="block h-[30px] font-xs appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 w-[200px]"
                                            >
                                            <option value="">إختر منطقة</option>
                                            <option value="1">المرجة</option>
                                            <option value="2">الحميدية</option>
                                            <option value="3">الميدان</option>
                                            <option value="4">الشاغور</option>
                                            <option value="5">البرامكة</option>
                                            <option value="6">ركن الدين</option>
                                            <option value="7">الصالحية</option>
                                            <option value="8">المزة</option>
                                            <option value="9">المالكي</option>
                                            <option value="10">كفرسوسة</option>
                                            <option value="11">جرمانا</option>
                                            <option value="12">جوبر</option>
                                            <option value="13">القابون</option>
                                            <option value="14">برزة</option>
                                            <option value="15">ساحة الأمويين</option>
                                            <option value="16">باب توما</option>
                                            <option value="17">القصاع</option>
                                            <option value="18">باب شرقي</option>
                                            <option value="19">المهاجرين</option>
                                            <option value="20">العدوي</option>
                                            <option value="21">عش الورور</option>
                                            <option value="22">الربوة</option>
                                            <option value="23">الزاهرة</option>
                                            <option value="24">القدم</option>
                                            <option value="25">السبع بحرات</option>
                                            <option value="26">اليرموك</option>
                                            <option value="27">المزرعة</option>
                                            <option value="28">مساكن برزة</option>
                                            <option value="29">الحجر الأسود</option>
                                            <option value="30">السيدة زينب</option>
                                            <option value="31">جرمانا الجديدة</option>
                                            <option value="32">صحنايا</option>
                                            <option value="33">داريا</option>
                                            <option value="34">معضمية الشام</option>
                                            <option value="35">القصور</option>
                                            <option value="36">أبو رمانة</option>
                                            <option value="37">الشيخ محي الدين</option>
                                            <option value="38">التجارة</option>
                                            <option value="39">الجسر الأبيض</option>
                                            <option value="40">ساحة المرجة</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                                            <img src={'/Assets/Icons/arrow-down.svg'}></img>
                                        </div>
                                    </div>
                                    <label
                                        onChange={handleInputChange}
                                        className="block text-gray-400 text-sm mt-2">
                                        العنوان
                                    </label>
                                </div>
                                <div className="w-full max-w-lg ml-[315px]">
                                    <div className="text-right ">
                                        <label className="block text-gray-500 text-sm mb-2">هل تعاني من مشاكل صحية؟</label>
                                        <div className="flex justify-end">
                                            {['yes', 'no'].map(value => (
                                                <label key={value} className="text-gray-400 flex items-center text-gray-500">
                                                    {value === 'yes' ? 'نعم' : 'لا'}
                                                    <input
                                                        type="radio"
                                                        name="has_physical_problems"
                                                        value={value}
                                                        checked={formData.has_physical_problems === value}
                                                        onChange={handleInputChange}
                                                        className="ml-1 mr-3"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/* {formData.healthIssues === 'yes' && (
                                        <div className="mb-4 text-right">
                                            <input
                                                name="healthIssuesDescription"
                                                type="text"
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full bg-[var(--secondary-bg-color)] border-0 border-b focus:outline-none text-right"
                                                placeholder=":الحالة"
                                            />
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={nextStep}
                                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full shadow-sm"
                            >
                                التالي
                            </button>
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black px-4 py-2 rounded-full shadow-sm"
                                disabled={step === 1}
                            >
                                السابق
                            </button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-right text-xl font-bold mb-4">مؤهلات علمية</h2>
                        {/* Add your input fields here for the second step */}
                        <form className="w-full max-w-3xl pb-5">
                            <div className="text-right">
                                <label className="text-gray-700 text-sm font-bold mb-2">
                                    ما هي أعلى شهادة حصلت عليها؟
                                </label>
                                <div className="flex justify-end flex-wrap">
                                    {['دراسات عليا', 'شهادة جامعية', 'شهادة ثانوية','شهادة ابتدائية'].map(level => (
                                        <label key={level} className="ml-4 flex items-center text-gray-700">
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                            <input
                                                type="radio"
                                                name="level_name"
                                                value={level}
                                                checked={formData.level_name === level}
                                                onChange={handleInputChange}
                                                className="ml-1"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* ................... */}
                            <div className="mb-4 text-right flex justify-end mt-5">
                                <div className="relative pr-5 ">
                                    <select
                                        name="school"
                                        value={formData.school}
                                        onChange={handleInputChange}
                                        className="block h-[30px] font-xs appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 w-[200px]"
                                    >
                                        {institutions.map((institution, idx) => (
                                            <option key={idx} value={institution}>{institution}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                                        <img src={'/Assets/Icons/arrow-down.svg'} alt="Arrow down" />
                                    </div>
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    الجهة التعليمية
                                </label>
                            </div>
                            {/* ................... */}
                            <div className="mb-4 text-right flex justify-end">
                                <div className="relative pr-5 ">
                                    <select
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleInputChange}
                                        className="block h-[30px] font-xs appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 w-[200px]">
                                        {specializations.map((specialization, idx) => (
                                            <option key={idx} value={specialization}>{specialization}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                                        <img src={'/Assets/Icons/arrow-down.svg'}></img>
                                    </div>
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    التخصص
                                </label>
                            </div>
                            {/* ................... */}
                            <div className='w-full flex pl-5'>
                                <div className="mb-4 text-right ">
                                    <div className="relative pr-5">
                                        <input
                                            type="date"
                                            name="to"
                                            value={formData.to}
                                            onChange={handleInputChange}
                                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded leading-tight focus:outline-none focus:border-blue-500 h-[30px] w-[200px]"
                                        />
                                    </div>
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 mr-5">
                                    إلى
                                </label>

                                <div className="mb-4 text-right ">
                                    <div className="relative pr-5">
                                        <input
                                            type="date"
                                            name="from"
                                            value={formData.from}
                                            onChange={handleInputChange}
                                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded leading-tight focus:outline-none focus:border-blue-500 h-[30px] w-[200px]"
                                        />
                                    </div>
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 mr-5">
                                    من
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    فترة الدراسة
                                </label>
                            </div>
                            {/* ................... */}
                            <div className="mb-4 text-right flex justify-end">
                                <div className="relative pr-5 ">
                                    <input
                                        type="number"
                                        name="graduation_rate"
                                        value={formData.graduation_rate}
                                        onChange={handleInputChange}
                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded leading-tight focus:outline-none focus:border-blue-500 h-[30px] w-[200px]"
                                    />
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    معدل التخرج
                                </label>
                            </div>
                        </form>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={nextStep}
                                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full shadow-sm"
                            >
                                التالي
                            </button>
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black px-4 py-2 rounded-full shadow-sm"
                            >
                                السابق
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-right text-xl font-bold mb-4">أوقات التطوع</h2>
                        <h3 className='text-right mb-4'>يرجى وضع الأيام الملائمة لك داخل الحقول في الأسفل</h3>
                        {/* Add your input fields here for the second step */}
                        <div className='pl-[100px]'>
                        الأحد
                        <input
                        type="radio"
                        name="day_id"
                        value="1"
                        checked={formData.day_id === "1"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        الإثنين
                        <input
                        type="radio"
                        name="day_id"
                        value="2"
                        checked={formData.day_id === "2"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        الثلاثاء
                        <input
                        type="radio"
                        name="day_id"
                        value="3"
                        checked={formData.day_id === "3"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        الأربعاء
                        <input
                        type="radio"
                        name="day_id"
                        value="4"
                        checked={formData.day_id === "4"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        الخميس
                        <input
                        type="radio"
                        name="day_id"
                        value="5"
                        checked={formData.day_id === "5"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        الجمعة
                        <input
                        type="radio"
                        name="day_id"
                        value="6"
                        checked={formData.day_id === "6"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        السبت
                        <input
                        type="radio"
                        name="day_id"
                        value="7"
                        checked={formData.day_id === "7"}
                        onChange={handleInputChange}
                        className="ml-1 mr-3"
                        /> 
                        </div>
                        <h3 className='text-right mb-4 mt-5'>يرجى وضع الأوقات الملائمة لك داخل الحقول في الأسفل</h3>

                        <div className=' pl-[398px]'>
                        صباحا  <input
                            type="radio"
                            name="time_id"
                            value="1"
                            checked={formData.time_id === "1"}
                            onChange={handleInputChange}
                            className="ml-1 mr-3"
                            /> 
                           ظهرا <input
                            type="radio"
                            name="time_id"
                            value="2"
                            checked={formData.time_id === "2"}
                            onChange={handleInputChange}
                            className="ml-1 mr-3"
                            /> 
                          مساء  <input
                            type="radio"
                            name="time_id"
                            value="3"
                            checked={formData.time_id === "3"}
                            onChange={handleInputChange}
                            className="ml-1 mr-3"
                            /> 
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={nextStep}
                                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full shadow-sm"
                            >
                                التالي
                            </button>
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black px-4 py-2 rounded-full shadow-sm"
                            >
                                السابق
                            </button>
                        </div>
                    </div>

                )}
                {step === 4 && (
                    <div>
                        <h2 className="text-right text-xl font-bold mb-4">الخبرات</h2>
                        <form className="w-full max-w-lg rounded-lg space-y-4 ml-[100px]">
                            <div>
                                <input
                                    name="volunteering_reasons"
                                    placeholder='لماذا تريد التطوع'
                                    type="text"
                                    value={formData.volunteering_reasons}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right mb-7" />
                                <input
                                    name="current_other_charities"
                                    value={formData.current_other_charities}
                                    onChange={handleInputChange}
                                    placeholder='الجهات المستمر بالعمل معها، وما دورك فيها'
                                    type="text"
                                    className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right mb-7" />
                                <input
                                    name="courses_taken"
                                    value={formData.courses_taken}
                                    onChange={handleInputChange}
                                    placeholder='الدورات المتبعة'
                                    type="text"
                                    className="mt-1 block w-full bg-[var(--secondary-bg-color)] block mt-1 w-full border-0 border-b focus:outline-none text-right mb-7" />
                                <div className='flex flex-row justify-end'>
                                    <div className="relative ">
                                        <select
                                            name="skills"
                                            value={formData.skills.indexOf()}
                                            onChange={handleInputChange}
                                            className="block h-[30px] font-xs appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 mr-8 rounded leading-tight focus:outline-none focus:border-blue-500 w-[200px]">

                                            {skills.map((skill , index) => (
                                                <option key={index} value={index+1}>
                                                    {skill}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                                            <img src={'/Assets/Icons/arrow-down.svg'}></img>
                                        </div>
                                    </div>
                                    <label className="block text-gray-400 text-sm ml-2">
                                        المهارات التي أمتلكها
                                    </label>
                                </div>
                                <input
                                    name="potential_gains"
                                    value={formData.potential_gains}
                                    onChange={handleInputChange}
                                    placeholder='المهارات التي تتوقع من الجمعية تقديمها لك'
                                    type="text"
                                    className="mt-2 block w-full bg-[var(--secondary-bg-color)] block w-full border-0 border-b focus:outline-none text-right mb-7" />

                            </div>
                        </form>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleSubmit}
                                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full shadow-sm"
                            >
                                تأكيد
                            </button>
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black px-4 py-2 rounded-full shadow-sm"
                            >
                                السابق
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default VolunteerForm;
