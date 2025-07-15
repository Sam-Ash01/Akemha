import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category_id: '',
        item: '',
        item_details: '',
        first_name: '',
        last_name: '',
        address: '',
        start_date: '',
        end_date: '',
        phone_num: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/index_S_category', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Categories fetched:', data);

                if (data && Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    throw new Error('Received data is not an array or is missing');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('خطأ في جلب الفئات. الرجاء المحاولة لاحقًا.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const validateForm = () => {
        let formErrors = {};

        if (!formData.category_id) formErrors.category_id = "الفئة مطلوبة";
        if (!formData.item) formErrors.item = "العنصر مطلوب";
        if (!formData.item_details) formErrors.item_details = "تفاصيل العنصر مطلوبة";
        if (!formData.first_name) formErrors.first_name = "الاسم الأول مطلوب";
        if (!formData.last_name) formErrors.last_name = "اسم العائلة مطلوب";
        if (!formData.address) formErrors.address = "العنوان مطلوب";
        if (!formData.start_date) formErrors.start_date = "تاريخ البدء مطلوب";
        if (!formData.end_date) formErrors.end_date = "تاريخ الانتهاء مطلوب";
        if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
            formErrors.end_date = "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء";
        }
        const phoneRegex = /^\d{10,}$/;
        if (!formData.phone_num || !phoneRegex.test(formData.phone_num)) {
            formErrors.phone_num = "رقم الهاتف يجب أن يكون صحيحاً ويتكون من 10 أرقام على الأقل";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        fetch('http://localhost:8000/api/store_support', {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setFormData({
                    category_id: '',
                    item: '',
                    item_details: '',
                    first_name: '',
                    last_name: '',
                    address: '',
                    start_date: '',
                    end_date: '',
                    phone_num: '',
                });
                setErrors({});
                toast.success('تم إرسال الدعم بنجاح! شكراً لتعاونك.');
            })
            .catch(error => {
                setError('حدث خطأ أثناء إرسال الدعم. الرجاء المحاولة لاحقًا.');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8"
            style={{
                backgroundImage: `url('/Assets/Images/HomeSection/bgHeroSec.png')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment:'fixed'
            }}>
            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 overflow-hidden">
                {/* Image Section */}
                <div className="relative hidden md:block mt-12">
                    <img
                        src={'/Assets/Images/Support/support.svg'}
                        alt="Support"
                        className="h-3/4 object-cover filter brightness-75"
                    />
                </div>

                {/* Form Section */}
                <div className="flex flex-col justify-center p-8">
                    <div className="text-right flex flex-col justify-end items-end">
                        <div className="flex justify-end">
                            <div className="bg-[--primary-color] w-[60px] h-[2px] mt-5 mr-2"></div>
                            <h1 className="text-3xl font-bold mb-2 text-[--primary-color]"> دعم الجمعية</h1>
                        </div>
                        <p className="text-gray-700 py-2 text-xl">
                            انضم إلى جهودنا وقدم دعمك اليوم. نقدر كل مساهمة، كبيرة كانت أم صغيرة
                        </p>
                    </div>
                    {/* {error && <p className="text-red-600 mb-6 text-right">{error}</p>} */}
                    <form onSubmit={handleSubmit} className="space-y-6 pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                {loading ? (
                                    <p className="text-gray-500 text-right">جاري تحميل الفئات...</p>
                                ) : (
                                    <select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                        required
                                    >
                                        <option value="">اختر الفئة</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {errors.category_id && <p className="text-red-500 text-sm mt-1 text-right">{errors.category_id}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="item"
                                    value={formData.item}
                                    placeholder='العنصر'
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.item ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                    required
                                />
                                {errors.item && <p className="text-red-500 text-sm mt-1 text-right">{errors.item}</p>}
                            </div>
                        </div>
                        <div>
                            <textarea
                                name="item_details"
                                value={formData.item_details}
                                placeholder='تفاصيل العنصر'
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors.item_details ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                rows="4"
                                required
                            />
                            {errors.item_details && <p className="text-red-500 text-sm mt-1 text-right">{errors.item_details}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-xl mb-2 text-right">تاريخ الانتهاء</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.end_date ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                    required
                                />
                                {errors.end_date && <p className="text-red-500 text-sm mt-1 text-right">{errors.end_date}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-xl mb-2 text-right">تاريخ البدء</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.start_date ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                    required
                                />
                                {errors.start_date && <p className="text-red-500 text-sm mt-1 text-right">{errors.start_date}</p>}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                placeholder='العنوان'
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                required
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1 text-right">{errors.address}</p>}
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phone_num"
                                value={formData.phone_num}
                                placeholder='رقم الجوال'
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors.phone_num ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                required
                            />
                            {errors.phone_num && <p className="text-red-500 text-sm mt-1 text-right">{errors.phone_num}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    placeholder='الكنية'
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                    required
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1 text-right">{errors.last_name}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    placeholder='الاسم الأول'
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-right`}
                                    required
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1 text-right">{errors.first_name}</p>}
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[--primary-color] text-white p-3 rounded-lg hover:shadow-xl font-bold"
                        >
                            إرسال 
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Support;
