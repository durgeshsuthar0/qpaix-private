import React from "react";
import { format } from "date-fns";
import logo from "../assets/images/logo.png";
import { Row, Col } from "react-bootstrap";

const PayslipTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0";
    return parseFloat(amount).toLocaleString("en-IN");
  };

  const totalEarnings =
    parseFloat(data.basicSalary || 0) +
    parseFloat(data.hra || 0) +
    parseFloat(data.bonus || 0) +
    parseFloat(data.otherAllowance || 0);

  const netPay = totalEarnings - parseFloat(data.deductions || 0);

  // Get month name from the period data
  const getMonthName = () => {
    if (data.period?.monthName) {
      return data.period.monthName;
    }
    if (data.period?.month !== undefined) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[data.period.month] || "";
    }
    return format(new Date(data.paymentDate), "MMMM");
  };

  const getYear = () => {
    return data.period?.year || format(new Date(data.paymentDate), "yyyy");
  };

  const numberToWords = (num) => {
    if (num === 0) return "Zero";

    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertLessThanOneThousand = (n) => {
      if (n === 0) return "";
      let result = "";

      if (n >= 100) {
        result += units[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }

      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      } else if (n >= 10) {
        result += teens[n - 10] + " ";
        n = 0;
      }

      if (n > 0) {
        result += units[n] + " ";
      }

      return result.trim();
    };

    let result = "";
    let scale = 0;
    const scales = ["", "Thousand", "Million", "Billion"];

    while (num > 0) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        let chunkWords = convertLessThanOneThousand(chunk);
        if (scale > 0) {
          chunkWords += " " + scales[scale];
        }
        result = chunkWords + " " + result;
      }
      num = Math.floor(num / 1000);
      scale++;
    }

    return result.trim();
  };

  const amountInWords = (amount) => {
    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    let words = numberToWords(rupees) + " Rupees";
    if (paise > 0) {
      words += " and " + numberToWords(paise) + " Paise";
    }
    return words;
  };

  return (
    <div
      className="payslip-template"
      style={{
        border: "1px solid #00263a",
        borderRadius: "4px",
        padding: "15px",
        width: "210mm",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.3",
        WebkitPrintColorAdjust: "exact",
        colorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      <img className="bg-img" src={logo} alt="Company Logo"></img>
      <div
        className="payslip-header"
        style={{
          textAlign: "center",
          marginBottom: "10px",
          borderBottom: "1px solid #00263a",
          paddingBottom: "5px",
        }}
      >
        <div className="logo">
          <img
            className="mt-3 mb-2"
            src={logo}
            width={100}
            alt="Company Logo"
          ></img>
        </div>
        <h1
          style={{
            color: "#00263a",
            marginBottom: "3px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          QPAIX INFITECH PRIVATE LIMITED
        </h1>
        <p
          style={{
            margin: "3px 0",
            color: "#555",
            fontSize: "10px",
          }}
        >
          1108 Shivalik Shilp II, Opp. ITC Narmada, Vastrapur, Ahmedabad-380015
        </p>
        <p
          style={{
            margin: "3px 0",
            color: "#555",
            fontSize: "10px",
          }}
        >
          Contact No : +91 79-49229744 | Email : info@qpaix.com
        </p>
      </div>

      <div
        className="payslip-title"
        style={{
          textAlign: "center",
          margin: "10px 0",
          borderBottom: "1px solid #ddd",
          paddingBottom: "5px",
        }}
      >
        <h2
          style={{
            color: "#00263a",
            fontSize: "14px",
            margin: "0",
          }}
        >
          Salary Payslip for the Month of {getMonthName()} {getYear()}
        </h2>
      </div>

      <div className="emp-table mt-2">
        <table>
          <tr>
            <td class="label fw-semibold">Emp Code</td>
            <td> {data.empCode}</td>
            <td class="label fw-semibold">Date of Joining</td>
            <td>{formatDate(data.doj)}</td>
          </tr>
          <tr>
            <td class="label fw-semibold">Emp Name</td>
            <td>{data.empName}</td>
            <td class="label fw-semibold">Total Working Days</td>
            <td>{data.workingDays}</td>
          </tr>
          <tr>
            <td class="label fw-semibold">Department</td>
            <td>{data.department}</td>
            <td class="label fw-semibold">LOP Days</td>
            <td> {data.lopDays}</td>
          </tr>
          <tr>
            <td class="label fw-semibold">Designation</td>
            <td> {data.designation}</td>
            <td class="label fw-semibold">Paid Days</td>
            <td>{data.paidDays}</td>
          </tr>
          <tr>
            <td class="label fw-semibold">Gender</td>
            <td> {data.gender}</td>
            <td class="label fw-semibold">Leaves Taken</td>
            <td>{data.leavesTaken}</td>
          </tr>
        </table>
      </div>

      <div className="salary-details" style={{ marginBottom: "15px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "10px",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#00263a",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>
                Description
              </th>
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>
                Earnings
              </th>
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>
                Deductions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                Basic Salary
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                {formatCurrency(data.basicSalary)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              ></td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                House Rent Allowance
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                {formatCurrency(data.hra)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              ></td>
            </tr>
            <tr>
              <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                Bonus
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                {formatCurrency(data.bonus)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              ></td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                Other Allowance
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                {formatCurrency(data.otherAllowance)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                {formatCurrency(data.deductions)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px", border: "1px solid #ddd" }}>PT</td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              ></td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              ></td>
            </tr>
          </tbody>
          <tfoot>
            <tr
              style={{
                backgroundColor: "#f0f0f0",
                fontWeight: "bold",
              }}
            >
              <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                Total
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                  background: "#00263a",
                  color: "#ffffff",
                }}
              >
                {formatCurrency(totalEarnings)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                {formatCurrency(data.deductions)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        className="payment-details"
        style={{
          marginBottom: "15px",
          fontSize: "11px",
        }}
      >
        <Row>
          <Col>
            <div>
              <p>
                <strong>Payment Date:</strong> {formatDate(data.paymentDate)}
              </p>
              <p>
                <strong>Bank Name:</strong> {data.bankName}
              </p>
              <p>
                <strong>Bank Account No:</strong> {data.accountNo}
              </p>
              <p>
                <strong>PAN No.:</strong> {data.panNo || "N/A"}
              </p>
              <p>
                <strong>PF No.:</strong> {data.pfNo || "N/A"}
              </p>
            </div>
          </Col>
          <Col>
            <div style={{ textAlign: "right" }}>
              <div>
                <h3
                  style={{
                    color: "#00263a",
                    fontSize: "12px",
                    margin: "5px 0",
                  }}
                >
                  NET PAY
                </h3>
                <h2
                  style={{
                    color: "#00263a",
                    margin: "5px 0",
                    fontSize: "14px",
                  }}
                >
                  {formatCurrency(netPay)}
                </h2>
                <p
                  style={{
                    fontStyle: "italic",
                    fontSize: "10px",
                    margin: "0",
                  }}
                >
                  {amountInWords(netPay)} Only
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Leave Balance Table */}
      <div className="leave-balance" style={{ marginTop: "15px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "10px",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#00263a",
                color: "white",
                textAlign: "center",
              }}
            >
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>
                Leave Type
              </th>
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>CL</th>
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>PL</th>
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>SL</th>
              <th style={{ padding: "6px", border: "1px solid #ddd" }}>LWP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Opening Leave
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.cl?.opening || 0}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.pl?.opening || 0}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.sl?.opening || 0}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                -
              </td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Leave Taken
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.cl?.taken || 0}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.pl?.taken || 0}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.sl?.taken || 0}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.lwp?.taken || 0}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Penalty Leave
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                -
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                -
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                -
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {data.leaveData?.lwp?.penalty || 0}
              </td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Leave Balance
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {(data.leaveData?.cl?.opening || 0) -
                  (data.leaveData?.cl?.taken || 0)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {(data.leaveData?.pl?.opening || 0) -
                  (data.leaveData?.pl?.taken || 0)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {(data.leaveData?.sl?.opening || 0) -
                  (data.leaveData?.sl?.taken || 0)}
              </td>
              <td
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="payslip-footer"
        style={{
          textAlign: "center",
          marginTop: "10px",
          paddingTop: "5px",
          borderTop: "1px dashed #00263a",
          color: "#666",
          fontSize: "9px",
        }}
      >
        <p>This is computer generated salary slip</p>
      </div>
    </div>
  );
};

export default PayslipTemplate;
