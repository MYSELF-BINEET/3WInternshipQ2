import { useState, useEffect } from "react";
import "../../css/AdminDashboard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBankAccounts();
  }, [searchQuery]);

  const fetchBankAccounts = async () => {
    try {
      let url = `${BACKEND_URI}/api/admin/getAllBank`;
      if (searchQuery) {
        url = `${BACKEND_URI}/api/admin/search?query=${searchQuery}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bank accounts");
      }

      const data = await response.json();
      setAccounts(Array.isArray(data.accounts) ? data.accounts : []);
    } catch (error) {
      setError("Error fetching bank accounts: " + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <img
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTYTl2yMmBxsZ0a2ijLpEyN-Px3HdVDWx2Q&s"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXsVDigmVB-9l8jbey8TkBrJ6p-xzggNRXg&s"
        alt="E-BANK Logo"
        className="e-bank-logo3"
      />
      <button className="btn3" onClick={() => navigate("/")}>
        Log out
      </button>
      <h1 className="adh1">Admin DashBoard</h1>
      <br />
      <h2 className="adh2">SEARCH WITHIN TABLE</h2>

      {error && <p className="error">{error}</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search something here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>🔍</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Account Holder</th>
            <th>Bank Name</th>
            <th>IFSC Code</th>
            <th>Account No</th>
            <th>Branch Name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan="4">No accounts found</td>
            </tr>
          ) : (
            accounts.map((account, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{account.accountHolderName}</td>
                <td>{account.bankName}</td>
                <td>{account.ifscCode}</td>
                <td>{account.accountNumber}</td>
                <td>{account.branchName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <footer>
        Made with ❤️ by <span>Bineet Pradhan</span>
      </footer>
    </div>
  );
};

export default AdminDashboard;
