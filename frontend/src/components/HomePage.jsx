import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BankAccountItem from "../components/Bank/BankAccountItem";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
// import "../css/Home.css";
import "../css/Home2.css"
import { CiLogout } from "react-icons/ci";
import { CiBank } from "react-icons/ci";

const HomePage = () => {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBankAccounts();
    fetchMe();
  }, []);

  const fetchBankAccounts = async () => {
    toast.promise(
      (async () => {
        const response = await fetch(`${BACKEND_URI}/api/v1/getOwnBankAcc`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setBankAccounts(data);
      })(),
      {
        loading: "Fetching bank accounts...",
        success: "Bank accounts fetched successfully!",
        error: "Failed to fetch bank accounts.",
      }
    );
  };
  

  const fetchMe = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setMe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBankClick = (accountId) => {
    navigate(`/bank-details/${accountId}`);
  };

  const handleAddBankClick = () => {
    navigate("/add-bank");
  };

  const handleAccountUpdate = async (id, updatedAccount) => {
    // Define the account update logic
    const updateAccount = async () => {
      const response = await fetch(`${BACKEND_URI}/api/v1/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAccount),
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating account");
      }
  
      return response;
    };
  
    // Use toast.promise to provide feedback
    toast
      .promise(
        updateAccount(),
        {
          loading: "Updating account...",
          success: "Account updated successfully!",
          error: "Failed to update account.",
        }
      )
      .then(() => {
        fetchBankAccounts(); // Refresh the accounts after successful update
      })
      .catch((error) => {
        console.error("Error updating account:", error);
      });
  };
  
  const handleAccountDelete = async (id) => {
    // Define the account deletion logic
    const deleteAccount = async () => {
      const response = await fetch(`${BACKEND_URI}/api/v1/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error deleting account");
      }
  
      return response;
    };
  
    // Use toast.promise to provide feedback
    toast
      .promise(
        deleteAccount(),
        {
          loading: "Deleting account...",
          success: "Account deleted successfully!",
          error: "Failed to delete account.",
        }
      )
      .then(() => {
        fetchBankAccounts(); // Refresh the accounts after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setSelectedFile(file);
      console.log(selectedFile);
      // toast.success("Please Wait file will be update");
      await handleUploadProfilePic(file);
    } else {
      toast.error("No file selected.");
    }
  };

  const handleUploadProfilePic = async (file) => {
    if (!file) {
      toast.error("Please select a photo!");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePhoto", file);
  
    // Define the profile picture upload logic
    const uploadProfilePicture = async () => {
      const response = await fetch(`${BACKEND_URI}/api/v1/updatePic`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error uploading profile picture");
      }
  
      return response;
    };
  
    // Use toast.promise for handling the upload process
    toast
      .promise(
        uploadProfilePicture(),
        {
          loading: "Uploading profile picture...",
          success: "Profile picture uploaded successfully!",
          error: "Failed to upload profile picture.",
        }
      )
      .then(() => {
        fetchMe(); // Refresh the user profile after successful upload
        setSelectedFile(null); // Clear the file after upload
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // alert('Logout Successful');
        toast.success("Logout Successful");
        navigate("/");
      } else {
        alert("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };


  if (!me) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="homeContainer">
      <div className="left_side">

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            {me && me.user && (
              <img
                src={me.user.profilePhoto}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ccc", // Subtle border
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                }}
              />
            )}
            <input
              className="home_in"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "#000", // Modern teal shade
                color: "white",
                borderRadius: "50%",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for icon
                transition: "background-color 0.3s",
              }}
            >
              <AiOutlineCamera size={20} />
            </label>
          </div>
        </div>
        {me && me.user && (
        <h3>{me.user.username}</h3>
        )}
        <p style={{color:"red"}}>Manage Your Account Securely!!!!</p>
        <button
          className="home_btn"
          onClick={handleAddBankClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#37a39a", // Modern teal shade
            color: "white", // White text
            border: "none", // No border
            borderRadius: "5px", // Rounded corners
            padding: "10px 20px", // Padding for the button
            cursor: "pointer", // Pointer on hover
            fontSize: "16px", // Font size for better readability
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
            gap: "10px", // Space between icon and text
          }}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")} // Slight shrink on click
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")} // Reset scale on release
        >
          <CiBank style={{ width: "24px", height: "24px" }} />{" "}
          {/* Adjust icon size */}
          <span style={{ margin: 0 }}>Add Bank</span> {/* Styled text */}
        </button>

        <button
          className="logout"
          onClick={handleLogout}
          style={{
            display: "flex",
            width: "145px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f44336", // Red background
            color: "white", // White text
            border: "none", // No border
            borderRadius: "5px", // Rounded corners
            padding: "10px 20px", // Padding for the button
            cursor: "pointer", // Pointer on hover
            fontSize: "16px", // Font size for better readability
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
          }}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")} // Slight shrink on click
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")} // Reset scale on release
        >
          <CiLogout style={{ width: "24px", height: "24px" }} />
          <p style={{ paddingLeft: "10px", margin: 0 }}>Logout</p>
        </button>
      </div>
      <div className="right_side">
        <h2 className="home_h2">Your Bank Accounts</h2>
          {/* <p style={{color:"red", position:"relative" ,left:"270px"}}>Click Anywhere to see your Account Details</p> */}
        <ul className="home_ul">
          {bankAccounts.map((account) => (
            <BankAccountItem
              key={account._id}
              account={account}
              onClick={handleBankClick}
              onUpdate={handleAccountUpdate}
              onDelete={handleAccountDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
