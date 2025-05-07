import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/faq.json')
      .then(res => res.json())
      .then(data => {
        setFaqs(data.faqs);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching FAQ data:', error);
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our subscription box service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full py-5 px-2 text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <span className="text-blue-600">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'max-h-96 opacity-100 pb-5 px-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
          <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 