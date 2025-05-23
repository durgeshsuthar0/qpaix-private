import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PayslipForm from './components/PayslipForm';
import PayslipPreview from './components/PayslipPreview';
import Header from './components/navbar'
import Footer from './components/footer'
import './assets/scss/style.scss'
import './App.scss';

function App() {
  const [payslipData, setPayslipData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data) => {
    setPayslipData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <div className="app">
      <Header  />
      {!showPreview ? (
        <PayslipForm onSubmit={handleFormSubmit} />
      ) : (
        <PayslipPreview 
          data={payslipData} 
          onBack={handleBackToForm} 
        />
      )}
      <Footer  />
    </div>
  );
}

export default App;