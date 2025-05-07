import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-4">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">1. Introduction</h2>
          <p className="mb-4">
            Subscription Box respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our subscription service or visit our website.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">2. Information We Collect</h2>
          <p className="mb-4">
            We collect several types of information from and about users of our website and subscription service, including:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Personal information such as name, email address, postal address, phone number, and payment information;</li>
            <li>Account information including your username and password;</li>
            <li>Subscription preferences and order history;</li>
            <li>Usage data about how you interact with our service;</li>
            <li>Device and connection information when you access our website.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">3. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Processing and fulfilling your subscription orders;</li>
            <li>Managing your account and providing customer support;</li>
            <li>Communicating with you about promotions, new products, and other news;</li>
            <li>Personalizing your experience and delivering content relevant to your interests;</li>
            <li>Analyzing and improving our website and subscription services;</li>
            <li>Protecting our services and preventing fraudulent activities.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">4. Information Sharing</h2>
          <p className="mb-4">
            We may share your personal information with:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Service providers who perform functions on our behalf (shipping companies, payment processors, etc.);</li>
            <li>Professional advisers including lawyers, auditors, and insurers;</li>
            <li>Regulatory authorities, law enforcement, or other third parties when required by law.</li>
          </ul>
          <p className="mb-4">
            We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">5. Data Security</h2>
          <p className="mb-4">
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way. Access to your personal data is limited to employees, agents, contractors, and other third parties who have a business need to know.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">6. Data Retention</h2>
          <p className="mb-4">
            We will retain your personal information only for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">7. Your Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal data, such as:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Accessing and receiving a copy of your data;</li>
            <li>Correcting inaccurate data;</li>
            <li>Requesting deletion of your data;</li>
            <li>Objecting to certain processing of your data;</li>
            <li>Withdrawing consent where processing is based on consent.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">9. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our data practices, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Email:</strong> rijoanmaruf@gmail.com<br />
            <strong>Phone:</strong> +880181360****<br />
            <strong>Address:</strong> House-194/A, Road-7, Block-C, Bashundhara R/A, Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 