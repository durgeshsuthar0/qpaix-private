import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const PayslipForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    empCode: "",
    empName: "",
    department: "",
    designation: "",
    gender: "",
    doj: null,
    workingDays: "",
    lopDays: "",
    paidDays: "",
    leavesTaken: "",
    basicSalary: "",
    hra: "",
    bonus: "",
    otherAllowance: "",
    deductions: "",
    pt: "",
    paymentDate: null,
    bankName: "",
    accountNo: "",
    panNo: "",
    pfNo: "",
    leaveData: {
      cl: { opening: 0, taken: 0, balance: 0 },
      pl: { opening: 0, taken: 0, balance: 0 },
      sl: { opening: 0, taken: 0, balance: 0 },
      lwp: { taken: 0, penalty: 0 },
    },
  });

  const [selectedPeriod, setSelectedPeriod] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const months = [
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Function to format date without timezone issues
    const formatDateWithoutTimezone = (date) => {
      if (!date) return null;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedData = {
      ...formData,
      doj: formData.doj ? formatDateWithoutTimezone(formData.doj) : "",
      paymentDate: formData.paymentDate
        ? formatDateWithoutTimezone(formData.paymentDate)
        : "",
      period: {
        month: selectedPeriod.month,
        year: selectedPeriod.year,
        monthName:
          months.find((m) => m.value === selectedPeriod.month)?.label || "",
      },
    };

    onSubmit(formattedData);
  };

  return (
    <React.Fragment>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div className="form-main mt-5">
            <div className="form-title">
              <h3>Employee Details</h3>
            </div>
            <div className="form-content">
              <Row className="mt-3">
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Payslip Month</Form.Label>
                    <Form.Select
                      value={selectedPeriod.month}
                      onChange={(e) =>
                        setSelectedPeriod((prev) => ({
                          ...prev,
                          month: parseInt(e.target.value),
                        }))
                      }
                      required
                    >
                      <option value="">Select Month</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Payslip Year</Form.Label>
                    <Form.Select
                      value={selectedPeriod.year}
                      onChange={(e) =>
                        setSelectedPeriod((prev) => ({
                          ...prev,
                          year: parseInt(e.target.value),
                        }))
                      }
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Employee Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="empCode"
                      placeholder="Enter employee code"
                      value={formData.empCode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="empName"
                      placeholder="Enter employee name"
                      value={formData.empName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      placeholder="Enter department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Joining</Form.Label>
                    <Calendar
                      value={formData.doj}
                      onChange={(e) => handleDateChange("doj", e.value)}
                      dateFormat="yy-mm-dd"
                      placeholder="Select joining date"
                      className="w-100"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Total Working Days</Form.Label>
                    <Form.Control
                      type="number"
                      name="workingDays"
                      value={formData.workingDays}
                      placeholder="Enter total working days"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>LOP Days</Form.Label>
                    <Form.Control
                      type="number"
                      name="lopDays"
                      value={formData.lopDays}
                      placeholder="Enter LOP days"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Paid Days</Form.Label>
                    <Form.Control
                      type="number"
                      name="paidDays"
                      value={formData.paidDays}
                      onChange={handleChange}
                      placeholder="Enter paid days"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Leaves Taken</Form.Label>
                    <Form.Control
                      type="number"
                      name="leavesTaken"
                      placeholder="Enter Leave Taken"
                      value={formData.leavesTaken}
                      onChange={handleChange}
                      step="0.5"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Date</Form.Label>
                    <Calendar
                      value={formData.paymentDate}
                      onChange={(e) => handleDateChange("paymentDate", e.value)}
                      dateFormat="yy-mm-dd"
                      placeholder="Select payment date"
                      className="w-100"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>

          <div className="form-main mt-4">
            <div className="form-content">
              <div className="form-title">
                <h3>Earnings</h3>
              </div>
              <Row className="mt-3">
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Basic Salary</Form.Label>
                    <Form.Control
                      type="number"
                      name="basicSalary"
                      placeholder="Enter basic salary"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>HRA</Form.Label>
                    <Form.Control
                      type="number"
                      name="hra"
                      placeholder="Enter HRA"
                      value={formData.hra}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bonus</Form.Label>
                    <Form.Control
                      type="number"
                      name="bonus"
                      value={formData.bonus}
                      placeholder="Enter bouns here"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Other Allowance</Form.Label>
                    <Form.Control
                      type="number"
                      name="otherAllowance"
                      value={formData.otherAllowance}
                      placeholder="Enter other allowance"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Deductions</Form.Label>
                    <Form.Control
                      type="number"
                      name="deductions"
                      value={formData.deductions}
                      placeholder="Enter deductions"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div className="form-main mt-4">
            <div className="form-content">
              <div className="form-title">
                <h3> Bank Details</h3>
              </div>

              <Row className="mt-3">
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bankName"
                      placeholder="Enter bank name"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="accountNo"
                      placeholder="Enter account number"
                      value={formData.accountNo}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>PAN Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter PAN number"
                      name="panNo"
                      value={formData.panNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>PF Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter PF number"
                      name="pfNo"
                      value={formData.pfNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div className="form-main mt-4">
            <div className="form-content">
              <div className="form-title">
                <h3>Leave Balance</h3>
              </div>
              <Row className="mt-3">
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>CL Opening</Form.Label>
                    <Form.Control
                      type="number"
                      name="clOpening"
                      value={formData.leaveData.cl.opening}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            cl: {
                              ...prev.leaveData.cl,
                              opening: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>CL Taken</Form.Label>
                    <Form.Control
                      type="number"
                      name="clTaken"
                      value={formData.leaveData.cl.taken}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            cl: { ...prev.leaveData.cl, taken: e.target.value },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>PL Opening</Form.Label>
                    <Form.Control
                      type="number"
                      name="plOpening"
                      value={formData.leaveData.pl.opening}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            pl: {
                              ...prev.leaveData.pl,
                              opening: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>PL Taken</Form.Label>
                    <Form.Control
                      type="number"
                      name="plTaken"
                      value={formData.leaveData.pl.taken}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            pl: { ...prev.leaveData.pl, taken: e.target.value },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>SL Opening</Form.Label>
                    <Form.Control
                      type="number"
                      name="slOpening"
                      value={formData.leaveData.sl.opening}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            sl: {
                              ...prev.leaveData.sl,
                              opening: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>SL Taken</Form.Label>
                    <Form.Control
                      type="number"
                      name="slTaken"
                      value={formData.leaveData.sl.taken}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            sl: { ...prev.leaveData.sl, taken: e.target.value },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>LWP Taken</Form.Label>
                    <Form.Control
                      type="number"
                      name="lwpTaken"
                      value={formData.leaveData.lwp.taken}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            lwp: {
                              ...prev.leaveData.lwp,
                              taken: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>LWP Penalty</Form.Label>
                    <Form.Control
                      type="number"
                      name="lwpPenalty"
                      value={formData.leaveData.lwp.penalty}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          leaveData: {
                            ...prev.leaveData,
                            lwp: {
                              ...prev.leaveData.lwp,
                              penalty: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div className="text-center mt-4 pb-4">
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#00263a", borderColor: "#00263a" }}
            >
              Generate Payslip
            </Button>
          </div>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default PayslipForm;
