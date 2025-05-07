import React from 'react';
import PageTitle from '../PageTitle';
import HeroSection from './HeroSection';
import Features from './Features';
import CustomerReviews from './CustomerReviews';
import FAQ from './FAQ';
import SubscriptionServices from './SubscriptionServices';

const Home = () => {
  return (
    <>
      <PageTitle title="Home" />
      <div className=''>
        <HeroSection />
        <SubscriptionServices />
        <Features />
        <CustomerReviews />
        <FAQ />
      </div>
    </>
  );
};

export default Home;