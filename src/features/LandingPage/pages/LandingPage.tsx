import React from 'react';
import Header from '../components/Header';
import FeatureSection from '../components/FeatureSection';
import StepSection from '../components/StepSection';
import TestimonialSection from '../components/TestimonialSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="">
      {/* Header */}
      <Header />
      <FeatureSection />
      <StepSection />
      <TestimonialSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
