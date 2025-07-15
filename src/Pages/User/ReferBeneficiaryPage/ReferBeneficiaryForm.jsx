import React, { useState } from 'react';

const ReferBeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    // بيانات المشير
    r_first_name: '',
    r_last_name: '',
    r_phone: '',
    r_additional_details: '',
    r_email: '',
    relation_with_beneficiary: '',
    offer_status: 'pending', // Default value

    // بيانات المستفيد
    first_name: '',
    last_name: '',
    father_name: '',
    mother_name: '',
    living_status: '',
    birth_date: '',
    birth_place: '',
    marital_status: '',
    educational_level: '',
    profession: '',
    previous_address: '',
    current_address: '',
    mobile_number: '',
    telephone_number: '',

    // بيانات عائلة المستفيد
    partner_name: '',
    partner_father_name: '',
    partner_mother_name: '',
    partner_birth_date: '',
    partner_birth_place: '',
    family_members_number: '',
    males_number: '',
    female_number: '',
    family_provider_name: '',
    family_provider_identity: '',
    people_count_on_fp: '',
    under18: '',
    above18: '',
    above60: '',
    special_needs: '',
    special_needs_situation: '',
    relatives_at_home: '',

    // بيانات أطفال المستفيد
    children: [
      { name: '', c_birth_date: '', c_birth_place: '', educational_status: '' },
    ],

    // الوضع المعيشي للمستفيد
    status: '',
    rent: '',
    rooms_num: '',
    house_situation: '',

    // الوضع الاقتصادي للمستفيد
    income: '',
    income_source: '',
    additional_details: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      children: updatedChildren,
    });
    console.log("Updated child data:", updatedChildren);
  };


  const addChild = () => {
    setFormData({
      ...formData,
      children: [
        ...formData.children,
        { name: '', c_birth_date: '', c_birth_place: '', educational_status: '' },
      ],
    });
  };

  const removeChild = (index) => {
    const updatedChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: updatedChildren });
  };

  const validateForm = () => {
    let formErrors = {};
    const today = new Date().toISOString().split("T")[0]; // تاريخ اليوم بصيغة YYYY-MM-DD

    const isRequired = (field, fieldName) => {
      if (!field || field.trim() === '') {
        formErrors[fieldName] = "هذا الحقل مطلوب";
      }
    };

    const isDateBeforeToday = (date, fieldName) => {
      if (date && date >= today) {
        formErrors[fieldName] = "يجب أن يكون التاريخ قبل اليوم";
      }
    };

    const isPhoneNumberValid = (phone, fieldName) => {
      if (phone && !/^\d{10}$/.test(phone)) {
        formErrors[fieldName] = "يجب أن يتكون رقم الهاتف من 10 أرقام";
      }
    };

    // التحقق من الحقول الرئيسية في formData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (typeof formData[key] === 'string') {
          isRequired(formData[key], key);

          if (key === 'r_phone' || key === 'mobile_number') {
            isPhoneNumberValid(formData[key], key);
          }

          if (key.includes('date')) {
            isDateBeforeToday(formData[key], key);
          }
        } else if (Array.isArray(formData[key])) {
          // إذا كانت الخاصية هي مصفوفة، يتم تجاوز عملية التحقق لـ `children`
          if (key === 'children') {
            console.log("Skipping validation for children");
          }
        }
      }
    }

    setErrors(formErrors);

    // عرض الأخطاء في وحدة التحكم
    if (Object.keys(formErrors).length > 0) {
      console.log("Errors found in form validation:", formErrors);
    } else {
      console.log("No errors found, form is valid.");
    }

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData); // أضف هذه السطر لمراقبة البيانات
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8000/api/addReferOffer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('تم إرسال النموذج بنجاح');
          console.log("Form submitted:", formData);

          // إعادة تعيين النموذج إلى حالته الافتراضية
          setFormData({
            r_first_name: '',
            r_last_name: '',
            r_phone: '',
            r_additional_details: '',
            r_email: '',
            relation_with_beneficiary: '',
            offer_status: 'pending', // Default value
            first_name: '',
            last_name: '',
            father_name: '',
            mother_name: '',
            living_status: '',
            birth_date: '',
            birth_place: '',
            marital_status: '',
            educational_level: '',
            profession: '',
            previous_address: '',
            current_address: '',
            mobile_number: '',
            telephone_number: '',
            partner_name: '',
            partner_father_name: '',
            partner_mother_name: '',
            partner_birth_date: '',
            partner_birth_place: '',
            family_members_number: '',
            males_number: '',
            female_number: '',
            family_provider_name: '',
            family_provider_identity: '',
            people_count_on_fp: '',
            under18: '',
            above18: '',
            above60: '',
            special_needs: '',
            special_needs_situation: '',
            relatives_at_home: '',
            children: [
              { name: '', c_birth_date: '', c_birth_place: '', educational_status: '' },
            ],
            status: '',
            rent: '',
            rooms_num: '',
            house_situation: '',
            income: '',
            income_source: '',
            additional_details: '',
          });

        } else {
          alert('فشل في إرسال النموذج');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء إرسال النموذج');
      }
    } else {
      console.log("Form has errors. Check the logs for details.");
    }
  };


  return (
    <div className="bg-[var(--primary-bg-color)]">
      <div className="container bg-[var(--primary-bg-color)] mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">استمارة الإشارة لمستفيد</h1>
        <p className="text-lg mb-8 text-center ">
          يرجى ملء المعلومات التالية للإشارة لمستفيد والحصول على الدعم المناسب.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--primary-bg-color)] text-right p-6 space-y-6"
        >
          {/* قسم بيانات المشير */}
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">:بيانات الشخص الذي يملأ الاستمارة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">الاسم الأخير</label>
                <input
                  type="text"
                  name="r_last_name"
                  value={formData.r_last_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.r_last_name ? 'border-red-500' : ''}`}
                />
                {errors.r_last_name && <span className="text-red-500 text-sm mt-1 block">{errors.r_last_name}</span>}
              </div>
              <div>
                <label className="block mb-2">الاسم الأول</label>
                <input
                  type="text"
                  name="r_first_name"
                  value={formData.r_first_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.r_first_name ? 'border-red-500' : ''}`}
                />
                {errors.r_first_name && <span className="text-red-500 text-sm mt-1 block">{errors.r_first_name}</span>}
              </div>
              <div>
                <label className="block mb-2">رقم الهاتف</label>
                <input
                  type="text"
                  name="r_phone"
                  value={formData.r_phone}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.r_phone ? 'border-red-500' : ''}`}
                />
                {errors.r_phone && <span className="text-red-500 text-sm mt-1 block">{errors.r_phone}</span>}
              </div>
              <div>
                <label className="block mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="r_email"
                  value={formData.r_email}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.r_email ? 'border-red-500' : ''}`}
                />
                {errors.r_email && <span className="text-red-500 text-sm mt-1 block">{errors.r_email}</span>}
              </div>
              <div>
                <label className="block mb-2">تفاصيل إضافية</label>
                <input
                  type="text"
                  name="r_additional_details"
                  value={formData.r_additional_details}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.r_additional_details ? 'border-red-500' : ''}`}
                />
                {errors.r_additional_details && <span className="text-red-500 text-sm mt-1 block">{errors.r_additional_details}</span>}
              </div>
              <div>
                <label className="block mb-2">العلاقة بالمستفيد</label>
                <input
                  type="text"
                  name="relation_with_beneficiary"
                  value={formData.relation_with_beneficiary}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.relation_with_beneficiary ? 'border-red-500' : ''}`}
                />
                {errors.relation_with_beneficiary && <span className="text-red-500 text-sm mt-1 block">{errors.relation_with_beneficiary}</span>}
              </div>
            </div>
          </div>

          {/* قسم بيانات المستفيد */}
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]"> :بيانات المستفيد</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">الاسم الأخير</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.last_name && <span className="text-red-500 text-sm mt-1 block">{errors.last_name}</span>}
              </div>

              <div>
                <label className="block mb-2">الاسم الأول</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.first_name && <span className="text-red-500 text-sm mt-1 block">{errors.first_name}</span>}
              </div>

              <div>
                <label className="block mb-2">اسم الأم</label>
                <input
                  type="text"
                  name="mother_name"
                  value={formData.mother_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.mother_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.mother_name && <span className="text-red-500 text-sm mt-1 block">{errors.mother_name}</span>}
              </div>

              <div>
                <label className="block mb-2">اسم الأب</label>
                <input
                  type="text"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.father_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.father_name && <span className="text-red-500 text-sm mt-1 block">{errors.father_name}</span>}
              </div>

              <div>
                <label className="block mb-2">تاريخ الميلاد</label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.birth_date ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.birth_date && <span className="text-red-500 text-sm mt-1 block">{errors.birth_date}</span>}
              </div>

              <div>
                <label className="block mb-2">مكان الميلاد</label>
                <input
                  type="text"
                  name="birth_place"
                  value={formData.birth_place}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.birth_place ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.birth_place && <span className="text-red-500 text-sm mt-1 block">{errors.birth_place}</span>}
              </div>

              <div>
                <label className="block mb-2">حالة الشخص المعني</label>
                <select
                  name="living_status"
                  value={formData.living_status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.living_status ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <option value=""> - </option>
                  <option value="displaced">مهجر</option>
                  <option value="host_community">مجتمع مضيف</option>
                  <option value="returnee">مهجر عائد</option>
                </select>
                {errors.living_status && <span className="text-red-500 text-sm mt-1 block">{errors.living_status}</span>}
              </div>

              <div>
                <label className="block mb-2">الحالة الاجتماعية</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.marital_status ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <option value="">-</option>
                  <option value="single">عازب</option>
                  <option value="married">متزوج</option>
                  <option value="widowed">أرمل</option>
                  <option value="divorced">مطلق</option>
                  <option value="separated">منفصل</option>
                </select>
                {errors.marital_status && <span className="text-red-500 text-sm mt-1 block">{errors.marital_status}</span>}
              </div>

              <div>
                <label className="block mb-2">المهنة</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.profession ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.profession && <span className="text-red-500 text-sm mt-1 block">{errors.profession}</span>}
              </div>

              <div>
                <label className="block mb-2">المستوى التعليمي</label>
                <select
                  name="educational_level"
                  value={formData.educational_level}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.educational_level ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <option value="">-</option>
                  <option value="illiterate">أمي</option>
                  <option value="preparatory">إعدادي</option>
                  <option value="secondary">ثانوي</option>
                  <option value="university">جامعي</option>
                </select>
                {errors.educational_level && <span className="text-red-500 text-sm mt-1 block">{errors.educational_level}</span>}
              </div>

              <div>
                <label className="block mb-2">العنوان السابق</label>
                <input
                  type="text"
                  name="previous_address"
                  value={formData.previous_address}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.previous_address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.previous_address && <span className="text-red-500 text-sm mt-1 block">{errors.previous_address}</span>}
              </div>

              <div>
                <label className="block mb-2">العنوان الحالي</label>
                <input
                  type="text"
                  name="current_address"
                  value={formData.current_address}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.current_address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.current_address && <span className="text-red-500 text-sm mt-1 block">{errors.current_address}</span>}
              </div>

              <div>
                <label className="block mb-2">رقم الجوال</label>
                <input
                  type="text"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.mobile_number ? 'border-red-500' : 'border-gray-300'}`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyPress={(e) => {
                    if (!/^[0-9]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.mobile_number && <span className="text-red-500 text-sm mt-1 block">{errors.mobile_number}</span>}
              </div>

              <div>
                <label className="block mb-2">رقم الهاتف</label>
                <input
                  type="text"
                  name="telephone_number"
                  value={formData.telephone_number}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.telephone_number ? 'border-red-500' : 'border-gray-300'}`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyPress={(e) => {
                    if (!/^[0-9]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.telephone_number && <span className="text-red-500 text-sm mt-1 block">{errors.telephone_number}</span>}
              </div>
            </div>
          </div>

          {/* قسم بيانات عائلة المستفيد */}
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]"> :بيانات عائلة المستفيد</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">اسم والد الشريك/ة</label>
                <input
                  type="text"
                  name="partner_father_name"
                  value={formData.partner_father_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.partner_father_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.partner_father_name && <span className="text-red-500 text-sm mt-1 block">{errors.partner_father_name}</span>}
              </div>

              <div>
                <label className="block mb-2">اسم الشريك/ة</label>
                <input
                  type="text"
                  name="partner_name"
                  value={formData.partner_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.partner_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.partner_name && <span className="text-red-500 text-sm mt-1 block">{errors.partner_name}</span>}
              </div>

              <div>
                <label className="block mb-2">تاريخ ميلاد الشريك/ة</label>
                <input
                  type="date"
                  name="partner_birth_date"
                  value={formData.partner_birth_date}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.partner_birth_date ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.partner_birth_date && <span className="text-red-500 text-sm mt-1 block">{errors.partner_birth_date}</span>}
              </div>

              <div>
                <label className="block mb-2">اسم والدة الشريك/ة</label>
                <input
                  type="text"
                  name="partner_mother_name"
                  value={formData.partner_mother_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.partner_mother_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.partner_mother_name && <span className="text-red-500 text-sm mt-1 block">{errors.partner_mother_name}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد أفراد العائلة</label>
                <input
                  type="number"
                  name="family_members_number"
                  value={formData.family_members_number}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.family_members_number ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.family_members_number && <span className="text-red-500 text-sm mt-1 block">{errors.family_members_number}</span>}
              </div>

              <div>
                <label className="block mb-2">مكان ميلاد الشريك/ة</label>
                <input
                  type="text"
                  name="partner_birth_place"
                  value={formData.partner_birth_place}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.partner_birth_place ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.partner_birth_place && <span className="text-red-500 text-sm mt-1 block">{errors.partner_birth_place}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الإناث</label>
                <input
                  type="number"
                  name="female_number"
                  value={formData.female_number}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.female_number ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.female_number && <span className="text-red-500 text-sm mt-1 block">{errors.female_number}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الذكور</label>
                <input
                  type="number"
                  name="males_number"
                  value={formData.males_number}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.males_number ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.males_number && <span className="text-red-500 text-sm mt-1 block">{errors.males_number}</span>}
              </div>

              <div>
                <label className="block mb-2">صفة معيل العائلة</label>
                <input
                  type="text"
                  name="family_provider_identity"
                  value={formData.family_provider_identity}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.family_provider_identity ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.family_provider_identity && <span className="text-red-500 text-sm mt-1 block">{errors.family_provider_identity}</span>}
              </div>

              <div>
                <label className="block mb-2">اسم معيل العائلة</label>
                <input
                  type="text"
                  name="family_provider_name"
                  value={formData.family_provider_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.family_provider_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.family_provider_name && <span className="text-red-500 text-sm mt-1 block">{errors.family_provider_name}</span>}
              </div>

              <div>
                <label className="block mb-2">أقارب في المنزل</label>
                <input
                  type="text"
                  name="relatives_at_home"
                  value={formData.relatives_at_home}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.relatives_at_home ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.relatives_at_home && <span className="text-red-500 text-sm mt-1 block">{errors.relatives_at_home}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الأشخاص المعتمدين على المعيل</label>
                <input
                  type="number"
                  name="people_count_on_fp"
                  value={formData.people_count_on_fp}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.people_count_on_fp ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.people_count_on_fp && <span className="text-red-500 text-sm mt-1 block">{errors.people_count_on_fp}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الأشخاص تحت سن 18</label>
                <input
                  type="number"
                  name="under18"
                  value={formData.under18}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.under18 ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.under18 && <span className="text-red-500 text-sm mt-1 block">{errors.under18}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الأشخاص فوق سن 18</label>
                <input
                  type="number"
                  name="above18"
                  value={formData.above18}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.above18 ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.above18 && <span className="text-red-500 text-sm mt-1 block">{errors.above18}</span>}
              </div>

              <div>
                <label className="block mb-2">ذوي الاحتياجات الخاصة</label>
                <select
                  name="special_needs"
                  value={formData.special_needs}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.special_needs ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ direction: "rtl" }}
                >
                  <option value=" ">-</option>
                  <option value="0">لا</option>
                  <option value="1">نعم</option>
                </select>
                {errors.special_needs && <span className="text-red-500 text-sm mt-1 block">{errors.special_needs}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الأشخاص فوق سن 60</label>
                <input
                  type="number"
                  name="above60"
                  value={formData.above60}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.above60 ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.above60 && <span className="text-red-500 text-sm mt-1 block">{errors.above60}</span>}
              </div>

              <div>
                <label className="block mb-2">شرح حالة الاحتياجات الخاصة</label>
                <input
                  type="text"
                  name="special_needs_situation"
                  value={formData.special_needs_situation}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.special_needs_situation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.special_needs_situation && <span className="text-red-500 text-sm mt-1 block">{errors.special_needs_situation}</span>}
              </div>
            </div>
          </div>

          {/* قسم بيانات أطفال المستفيد */}
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">:بيانات أطفال المستفيد</h2>

            {/* تحقق من وجود children وأنها ليست فارغة */}
            {formData.children && formData.children.length > 0 ? (
              formData.children.map((child, index) => (
                <div key={index} className="relative bg-gray-100 p-4 rounded-md mb-4">
                  <button
                    type="button"
                    onClick={() => removeChild(index)}
                    className="absolute text-xl top-4 left-4 hover:text-red-700 focus:outline-none"
                    title="حذف طفل"
                  >
                    ×
                  </button>
                  <h3 className="text-xl mb-2">طفل {index + 1}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">الحالة التعليمية</label>
                      <select
                        name="educational_status"
                        value={child.educational_status || ''}
                        onChange={(e) => handleChildChange(index, e)}
                        className={`w-full p-2 border rounded text-right ${errors.children && errors.children[index] && errors.children[index].educational_status ? 'border-red-500' : 'border-gray-300'}`}
                        style={{ direction: "rtl", textAlign: "right" }}
                      >
                        <option value="">اختر الحالة التعليمية</option>
                        <option value="أمي">أمي</option>
                        <option value="ابتدائي">ابتدائي</option>
                        <option value="إعدادي">إعدادي</option>
                        <option value="ثانوي">ثانوي</option>
                        <option value="جامعي">جامعي</option>
                      </select>
                      {errors.children && errors.children[index] && errors.children[index].educational_status && <span className="text-red-500 text-sm mt-1 block">{errors.children[index].educational_status}</span>}
                    </div>

                    <div>
                      <label className="block mb-2">الاسم</label>
                      <input
                        type="text"
                        name="name"
                        value={child.name || ''}
                        onChange={(e) => handleChildChange(index, e)}
                        className={`w-full p-2 border rounded text-right ${errors.children && errors.children[index] && errors.children[index].name ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.children && errors.children[index] && errors.children[index].name && <span className="text-red-500 text-sm mt-1 block">{errors.children[index].name}</span>}
                    </div>

                    <div>
                      <label className="block mb-2">مكان الميلاد</label>
                      <input
                        type="text"
                        name="c_birth_place"
                        value={child.c_birth_place || ''}
                        onChange={(e) => handleChildChange(index, e)}
                        className={`w-full p-2 border rounded text-right ${errors.children && errors.children[index] && errors.children[index].c_birth_place ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.children && errors.children[index] && errors.children[index].c_birth_place && <span className="text-red-500 text-sm mt-1 block">{errors.children[index].c_birth_place}</span>}
                    </div>

                    <div>
                      <label className="block mb-2">تاريخ الميلاد</label>
                      <input
                        type="date"
                        name="c_birth_date"
                        value={child.c_birth_date || ''}
                        onChange={(e) => handleChildChange(index, e)}
                        className={`w-full p-2 border rounded ${errors.children && errors.children[index] && errors.children[index].c_birth_date ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.children && errors.children[index] && errors.children[index].c_birth_date && <span className="text-red-500 text-sm mt-1 block">{errors.children[index].c_birth_date}</span>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>لا توجد بيانات أطفال</p>
            )}

            <button
              type="button"
              onClick={addChild}
              className="mt-4 px-4 py-2 bg-[--primary-color] text-white rounded"
            >
              إضافة طفل
            </button>
          </div>

          {/* قسم الوضع المعيشي للمستفيد */}
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">الوضع المعيشي للمستفيد</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">مبلغ الإيجار شهرياً</label>
                <input
                  type="text"
                  name="rent"
                  value={formData.rent}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.rent ? 'border-red-500' : 'border-gray-300'}`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyPress={(e) => {
                    if (!/^[0-9]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.rent && <span className="text-red-500 text-sm mt-1 block">{errors.rent}</span>}
              </div>

              <div>
                <label className="block mb-2">وضع السكن</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <option value="">اختر وضع السكن</option>
                  <option value="ملك">ملك</option>
                  <option value="مستضاف">مستضاف</option>
                  <option value="أجار">أجار</option>
                  <option value="بناء غير مكتمل">بناء غير مكتمل</option>
                </select>
                {errors.status && <span className="text-red-500 text-sm mt-1 block">{errors.status}</span>}
              </div>

              <div>
                <label className="block mb-2">عدد الغرف</label>
                <input
                  type="number"
                  name="rooms_num"
                  value={formData.rooms_num}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.rooms_num ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  style={{ direction: "rtl" }}
                />
                {errors.rooms_num && <span className="text-red-500 text-sm mt-1 block">{errors.rooms_num}</span>}
              </div>

              <div>
                <label className="block mb-2">حالة إكساء المنزل</label>
                <input
                  type="text"
                  name="house_situation"
                  value={formData.house_situation}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.house_situation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.house_situation && <span className="text-red-500 text-sm mt-1 block">{errors.house_situation}</span>}
              </div>
            </div>
          </div>

          {/* قسم الوضع الاقتصادي للمستفيد */}
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">الوضع الاقتصادي للمستفيد</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">مصدر الدخل</label>
                <select
                  name="income_source"
                  value={formData.income_source}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.income_source ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <option value="">اختر مصدر الدخل</option>
                  <option value="تقاعدية">تقاعدية</option>
                  <option value="تحويلات مالية">تحويلات مالية</option>
                  <option value="تبرعات من جمعية أخرى">تبرعات من جمعية أخرى</option>
                  <option value="عمل/وظيفة">عمل/وظيفة</option>
                </select>
                {errors.income_source && <span className="text-red-500 text-sm mt-1 block">{errors.income_source}</span>}
              </div>

              <div>
                <label className="block mb-2">الدخل</label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.income ? 'border-red-500' : 'border-gray-300'}`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyPress={(e) => {
                    if (!/^[0-9]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.income && <span className="text-red-500 text-sm mt-1 block">{errors.income}</span>}
              </div>

              <div>
                <label className="block mb-2">تفاصيل إضافية</label>
                <textarea
                  name="additional_details"
                  value={formData.additional_details}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded text-right ${errors.additional_details ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.additional_details && <span className="text-red-500 text-sm mt-1 block">{errors.additional_details}</span>}
              </div>
            </div>
          </div>

          {/* زر إرسال النموذج */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-2 text-xl bg-[--primary-color] text-white rounded"
            >
              إرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferBeneficiaryForm;
