
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeeForm() {
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(true); 
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false); 
  const dataEntryRef = useRef(null); // Ref для блоку Data Entry


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyAddress: "",
    companyName: "",
  });


  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    companyAddress: false,
    companyName: false,
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  // валідація
  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      companyAddress: formData.companyAddress.trim() === "",
      companyName: formData.companyName.trim() === "",
    };
    setErrors(newErrors);

    // перевірка на помилку
    return Object.values(newErrors).some((error) => error);
  };

  // чи є пропущені поля 
  const isMissing = Object.values(formData).some((value) => value.trim() === "");

  // Анімаці списку
  const itemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  // Анімація Autofill
  const popupVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  // Анімація Great
  const successPopupVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  // таймер автофіл
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 5000); 
    return () => clearTimeout(timer); 
  }, []);

  // автозаповнення
  const handleAutofill = () => {
    setFormData({
      firstName: "John",
      lastName: "Doe",
      companyAddress: "123 Main St",
      companyName: "Example Corp",
    });
    setErrors({
      firstName: false,
      lastName: false,
      companyAddress: false,
      companyName: false,
    });
    setIsPopupVisible(false); 

    // Показуємо блок reat
    setTimeout(() => {
      setIsSuccessPopupVisible(true);
    }, 3000); // 3 секунди
  };


  const handleContinue = () => {
    setIsSuccessPopupVisible(false);
  };

  return (
    <div className="w-full md:w-1/2 p-6 relative">

      {isPopupVisible && (
        <div className="fixed inset-0 backdrop-blur-md z-10"></div>
      )}


      <div className={`relative z-20 ${isSuccessPopupVisible ? "blur-md" : ""}`}>
        {/* Контейнер для Data Entry з рефом */}
        <div ref={dataEntryRef} className="mb-4 bg-gray-50 rounded-lg shadow-md">
          <button
            onClick={() => setIsDataEntryOpen(!isDataEntryOpen)}
            className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 bg-blue-50 p-3 rounded-t-lg hover:bg-blue-100"
          >
            <span>Data Entry</span>
            <span>{isDataEntryOpen ? "−" : "+"}</span>
          </button>
          <AnimatePresence>
            {isDataEntryOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}
                className="p-4 bg-white rounded-b-lg"
              >

                <div className="mb-4">
                  <button
                    onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
                    className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                  >
                    <span>EMPLOYER</span>
                    <span>{isEmployeeOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {isEmployeeOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        className="mt-4 space-y-4"
                      >
                        {/* Об'єднуємо всі поля в один блок */}
                        <div
                          className={`p-4 rounded-md border-t-4 ${
                            isMissing ? "border-orange-500 bg-orange-50" : "border-transparent bg-gray-50"
                          }`}
                        >
                          {isMissing && (
                            <div className="flex items-center text-orange-500 mb-2">
                              <span className="inline-block w-4 h-4 rounded-full border-2 border-orange-500 mr-1"></span>
                              MISSING
                            </div>
                          )}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                First name <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onBlur={validateForm}
                                placeholder="Enter value"
                                className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  errors.firstName ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Last name <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onBlur={validateForm}
                                placeholder="Enter value"
                                className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  errors.lastName ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Company address <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="companyAddress"
                                value={formData.companyAddress}
                                onChange={handleInputChange}
                                onBlur={validateForm}
                                placeholder="Enter value"
                                className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  errors.companyAddress ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.companyAddress && (
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Company name <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                onBlur={validateForm}
                                placeholder="Enter value"
                                className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  errors.companyName ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.companyName && (
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

  
                <div className="mb-4 bg-gray-50 p-2 rounded-md">
                  <h2 className="text-xl font-semibold text-gray-800">DOCUMENT DETAILS</h2>
                </div>

                <div className="mb-4 bg-gray-50 p-2 rounded-md">
                  <h2 className="text-xl font-semibold text-gray-800">EMPLOYEE</h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isPopupVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            className="fixed top-1/2 transform -translate-y-1/2 w-72 p-4 bg-indigo-900 text-white rounded-lg shadow-lg z-50"
            style={{
              right: dataEntryRef.current
                ? `${dataEntryRef.current.offsetWidth + 20}px`
                : "20px", 
            }}
          >
            <h3 className="text-lg font-semibold mb-2">Data Entry</h3>
            <p className="text-sm mb-4">
              Do not spend too much time filling out the same information again and
              again.
            </p>
            <button
              onClick={handleAutofill}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Autofill
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuccessPopupVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={successPopupVariants}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-2xl font-bold mb-4">Great!</h2>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm mb-6">Congrats on completing the tour!</p>
              <button
                onClick={handleContinue}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
