import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-4">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing and using our subscription box service, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">2. Subscription Services</h2>
          <p className="mb-4">
            Our subscription box services offer periodic deliveries of curated products. By subscribing, you authorize us to charge your payment method for the subscription plan you've selected. Subscriptions automatically renew until cancelled.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">3. Pricing and Billing</h2>
          <p className="mb-4">
            All prices are displayed in the currency indicated on our website. We reserve the right to adjust pricing at any time, with notice provided to subscribers before changes take effect. Subscribers will be charged according to their selected subscription plan.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">4. Cancellation and Refunds</h2>
          <p className="mb-4">
            You may cancel your subscription at any time through your account settings. Cancellations must be made before the next billing cycle to avoid further charges. Refund policies vary by subscription type and are detailed in our Refund Policy.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">5. Delivery and Shipping</h2>
          <p className="mb-4">
            We make every effort to deliver subscription boxes within the timeframes indicated. Shipping times may vary based on location and other factors outside our control. We are not responsible for delays caused by customs, weather, or other circumstances beyond our reasonable control.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">6. Product Availability</h2>
          <p className="mb-4">
            We reserve the right to substitute items in subscription boxes based on availability. While we strive to include items as advertised, exact contents may vary. All substitutions will be of equal or greater value.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">7. Limitation of Liability</h2>
          <p className="mb-4">
            Our liability regarding any product purchased is strictly limited to the purchase price of that product. We are not liable for any indirect, special, incidental, or consequential damages of any kind.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our service following any changes constitutes acceptance of those changes.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">9. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about our Terms and Conditions, please contact us at:
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

export default TermsAndConditions; 