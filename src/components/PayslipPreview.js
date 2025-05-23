import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PayslipTemplate from './PayslipTemplate';
import { generatePdf } from '../utils/generatePdf';

const PayslipPreview = ({ data, onBack }) => {
  const handleDownload = async () => {
    const payslipElement = document.getElementById('payslip-template');
    await generatePdf(payslipElement, `${data.empName}-Payslip-${data.paymentDate.split('-')[1]}-${data.paymentDate.split('-')[0]}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="p-4 shadow">
      <Card.Body>
        <div className="text-center mb-4">
          <h2 style={{ color: '#00263a' }}>Payslip Preview</h2>
          <p>Review the payslip before downloading or printing</p>
        </div>

        <div id="payslip-template">
          <PayslipTemplate data={data} />
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button 
            variant="outline-secondary" 
            onClick={onBack}
          >
            Back to Form
          </Button>
          <Button 
            variant="outline-primary" 
            onClick={handlePrint}
          >
            Print Payslip
          </Button>
          <Button 
            variant="primary" 
            onClick={handleDownload}
            style={{ backgroundColor: '#00263a', borderColor: '#00263a' }}
          >
            Download as PDF
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PayslipPreview;