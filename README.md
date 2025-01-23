# Bank Information Management System

This project is a **Bank Information Management System** developed using **Node.js**, **Express**, **React**, and **MongoDB**. The system allows users to register, log in, and manage their bank account details, while admins can view and manage all users' bank information.

---
## Admin and User Login Credentials

To test the system, use the following hardcoded credentials:

### Admin Login
- **Username**: `admin`
- **Password**: `admin`

### User Login
- **Email**: `user@gmail.com`
- **Password**: `user`


## Features

### User Panel

1. **Authentication**:
   - User registration and login with secure password hashing using **bcrypt**.
   - User Upload Profile Picture with use of multer
   - Logout Functionlity
   - Fetch Login User Details

2. **Bank Information Management**:
   - **Add Bank**:
     - Add a bank account with the following fields:
       - IFSC code
       - Branch name
       - Bank name
       - Account number
       - Account holder's name
     - Input validation to ensure correct formats.
   - **View Bank Info**:
     - Retrieve and display all bank accounts associated with the logged-in user.
   - **Edit Bank Info**:
     - Update existing bank account details.
   - **Remove Bank Info**:
     - Delete a specific bank account.
   - **Multiple Accounts**:
     - Manage multiple bank accounts with CRUD operations.

### Admin Panel

1. **View User Bank Information**:
   - Admins can retrieve and view all users' bank account details.

2. **Search and Filter**:
   - Admins can search users by:
     - Name
     - Bank details (e.g., IFSC code, account number).

---

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: React
- **Database**: MongoDB
- **Authentication**: bcrypt

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MYSELF-BINEET/3WInternshipQ2.git
   ```

2. **Install Dependencies**:
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Setup Environment Variables**:
   - Create a `.env` file in the `backend` directory with the following keys:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-secret-key>
     PORT=5050
     NODE_ENV=production
     CLOUDINARY_CLOUD_NAME=<your-CLOUDINARY_API_NAME>
     CLOUDINARY_API_KEY=<your-CLOUDINARY_API_KEY>
     CLOUDINARY_API_SECRET=<your-CLOUDINARY_API_SECRET>
     ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application**:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5050](http://localhost:5050)

---

## Endpoints

### User Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | /api/v1/register | Register a new user.               |
| POST   | /api/v1/login    | Log in as an existing user.         |
| POST   | /api/v1/addBank          | Add a new bank account.             |
| GET    | /api/v1/getOwnBankAcc          | View all bank accounts for the user.|
| PUT    | /api/v1/update/:id      | Edit bank account details.          |
| DELETE | /api/v1/delete/:id      | Remove a specific bank account.     |

### Admin Endpoints

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST    | /api/admin/login   | Log in as Admin      |
| GET    | /api/admin/getAllBank   | Retrieve all users' bank info.       |
| GET    | /api/admin/search  | Search users by name or bank details.|

---

## Future Enhancements

- **Role-Based Access Control**:
  - Enhance security by implementing role-based permissions for users and admins.
- **Pagination**:
  - Add pagination for viewing user data in the admin panel.
- **Two-Factor Authentication**:
  - Introduce 2FA for enhanced security during login.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contact

- **Developer**: Bineet Pradhan
- **Email**: [bineetpradhan03@gmail.com](mailto:bineetpradhan03@gmail.com)
- **GitHub**: [MYSELF-BINEET](https://github.com/MYSELF-BINEET)

---

Thank you for exploring the **Bank Information Management System**! Feel free to contribute, suggest improvements, or reach out with any questions. 🚀
