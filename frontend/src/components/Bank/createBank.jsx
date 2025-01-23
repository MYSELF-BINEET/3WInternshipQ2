import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CreateBank.css";

const AddAccountPage = () => {
  const [ifscCode, setIfscCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/v1/addBank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ifscCode,
          branchName,
          bankName,
          accountNumber,
          accountHolderName,
        }),
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        navigate("/home"); // Redirect to home after successful account creation
      } else {
        setError("Invalid Input. Please Input Correct Format !!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="c_container">
         <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTYTl2yMmBxsZ0a2ijLpEyN-Px3HdVDWx2Q&s"
        alt="E-BANK Logo"
        className="e-bank-logo"
      />
      {/* Sidebar */}
      <div className="c_sidebar">
        <h2>ADD ACCOUNT</h2>
        <p className="c_menu">Manage your Bank&apos;s Securely!!!!</p>
      </div>

      {/* Form Section */}
      <div className="c_form-section">
        <h2 className="c_h2">Add Bank Account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="create_bank_form">
          <input
            className="c_in"
            type="text"
            placeholder="IFSC Code(Letter & Number Only)"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
          <input
            className="c_in"
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
          <input
            className="c_in"
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <input
            className="c_in"
            type="text"
            placeholder="Account Number(9 to 18 Digit)"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <input
            className="c_in"
            type="text"
            placeholder="Account Holder Name"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
          <button className="c_btn" type="submit">
            Add Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAccountPage;
