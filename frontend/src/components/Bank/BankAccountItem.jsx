import PropTypes from "prop-types";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "../../css/BankItem.css";

const BankAccountItem = ({ account, onUpdate, onDelete }) => {
  const [isEditingDialogOpen, setIsEditingDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Delete confirmation dialog state
  const [updatedAccount, setUpdatedAccount] = useState({
    bankName: account.bankName,
    accountHolderName: account.accountHolderName,
    accountNumber: account.accountNumber,
    ifscCode: account.ifscCode,
    branchName: account.branchName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount({
      ...updatedAccount,
      [name]: value,
    });
  };

  const handleUpdateSubmit = () => {
    onUpdate(account._id, updatedAccount);
    setIsEditingDialogOpen(false); // Close the edit form
  };

  const handleDeleteConfirm = () => {
    onDelete(account._id);
    setIsDeleteDialogOpen(false); // Close the delete confirmation dialog
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Ensure this sets the state properly
  };

  return (
    <li key={account._id} className="bankItem_li">
      <div className="bank_name">
        <span onClick={handleDialogOpen}>
          <p
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "none",
            }}
          >
            {account.bankName}
          </p>
          <p className="p">
            <strong>Account Holder Name:</strong> {account.accountHolderName}
          </p>
          <p className="p">
            <strong>Account Number:</strong>
            {account.accountNumber.replace(/\d(?=\d{3})/g, "*")}
          </p>
          <p className="p">
            <strong>Branch Name:</strong> {account.branchName}
          </p>
          <p className="p">
            <strong>IFSC Code:</strong>
            {account.ifscCode.replace(
              /^(.{2})(.*)(.{3})$/,
              (_, first, middle, last) =>
                `${first}${"*".repeat(middle.length)}${last}`
            )}
          </p>
        </span>

        <div className="btn-edit" style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setIsEditingDialogOpen(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f3c623", // Stylish yellow
              border: "none",
              borderRadius: "5px",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
              transition: "transform 0.2s, box-shadow 0.2s", // Smooth animations
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => setIsDeleteDialogOpen(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#d9534f", // Modern red
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
              transition:
                "transform 0.2s, box-shadow 0.2s, background-color 0.2s", // Smooth animations
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
              e.target.style.backgroundColor = "#c9302c"; // Darker red on hover
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              e.target.style.backgroundColor = "#d9534f";
            }}
          >
            Delete
          </button>
        </div>

        {/* Dialog for displaying bank details */}
        {/* <Dialog open={isDialogOpen} onClose={handleDialogClose} className="d_d">
          <DialogTitle className="d_dt">Bank Details</DialogTitle>
          <DialogContent className="d_dc">
            <p className="d_dp">
              <strong>Bank Name:</strong> {account.bankName}
            </p>
            <p className="d_dp">
              <strong>Account Holder Name:</strong> {account.accountHolderName}
            </p>
            <p className="d_dp">
              <strong>Account Number:</strong> {account.accountNumber}
            </p>
            <p className="d_dp">
              <strong>Branch Name:</strong> {account.branchName}
            </p>
            <p className="d_dp">
              <strong>IFSC Code:</strong> {account.ifscCode}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} className="d_db">Close</Button>
          </DialogActions>
        </Dialog> */}

<Dialog open={isDialogOpen} onClose={handleDialogClose} className="d_d">
  <DialogTitle className="d_dt">Bank Details</DialogTitle>
  <DialogContent className="d_dc">
    <p className="d_dp">
      <strong>Bank Name:</strong> {account.bankName}
    </p>
    <p className="d_dp">
      <strong>Account Holder Name:</strong> {account.accountHolderName}
    </p>
    <p className="d_dp">
      <strong>Account Number:</strong> {account.accountNumber}
    </p>
    <p className="d_dp">
      <strong>Branch Name:</strong> {account.branchName}
    </p>
    <p className="d_dp">
      <strong>IFSC Code:</strong> {account.ifscCode}
    </p>
  </DialogContent>
  <DialogActions className="d_actions">
    {/* <Button onClick={handleDialogClose} className="d_db cancel">
      Cancel
    </Button> */}
    <Button onClick={handleDialogClose} className="d_db">
      OK
    </Button>
  </DialogActions>
</Dialog>


        {/* Edit Dialog */}
        <Dialog
  open={isEditingDialogOpen}
  onClose={() => setIsEditingDialogOpen(false)}
  className="dialog-container"
>
  <div className="div_content">
  <DialogTitle className="dialog-title">Edit Bank Details</DialogTitle>
  <DialogContent className="bank_contant">
    <input
      className="bank_in"
      type="text"
      name="bankName"
      value={updatedAccount.bankName}
      onChange={handleInputChange}
      placeholder="Bank Name"
    />
    <input
      className="bank_in"
      type="text"
      name="accountHolderName"
      value={updatedAccount.accountHolderName}
      onChange={handleInputChange}
      placeholder="Account Holder Name"
    />
    <input
      className="bank_in"
      type="text"
      name="accountNumber"
      value={updatedAccount.accountNumber}
      onChange={handleInputChange}
      placeholder="Account Number"
    />
    <input
      className="bank_in"
      type="text"
      name="ifscCode"
      value={updatedAccount.ifscCode}
      onChange={handleInputChange}
      placeholder="IFSC Code"
    />
    <input
      className="bank_in"
      type="text"
      name="branchName"
      value={updatedAccount.branchName}
      onChange={handleInputChange}
      placeholder="Branch Name"
    />
  </DialogContent>
  <DialogActions className="dialog-actions">
    <Button
      onClick={handleUpdateSubmit}
      className="dialog-button save"
    >
      Save
    </Button>
    <Button
      onClick={() => setIsEditingDialogOpen(false)}
      className="dialog-button cancel"
    >
      Cancel
    </Button>
  </DialogActions>
  </div>
  
</Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
  open={isDeleteDialogOpen}
  onClose={() => setIsDeleteDialogOpen(false)}
  className="delete-dialog-container"
>
  <div className="delete-dialog-content">
    <DialogTitle className="delete-dialog-title">Confirm Delete</DialogTitle>
    <DialogContent>
      <p className="delete-dialog-message">
        Are you sure you want to delete this bank account?
      </p>
    </DialogContent>
    <DialogActions className="delete-dialog-actions">
      <Button
        onClick={() => setIsDeleteDialogOpen(false)}
        className="delete-dialog-button cancel"
      >
        Cancel
      </Button>
      <Button
        onClick={handleDeleteConfirm}
        className="delete-dialog-button delete"
      >
        Delete
      </Button>
    </DialogActions>
  </div>
</Dialog>

      </div>
    </li>
  );
};

BankAccountItem.propTypes = {
  account: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired,
    accountHolderName: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    ifscCode: PropTypes.string.isRequired,
    branchName: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BankAccountItem;
