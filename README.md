### 🏠 Flatmate Conflict Management System (QuirkyRoomie)

Flatmate Conflict Management System (QuirkyRoomie) helps roommates resolve household conflicts efficiently.
Users can file complaints, vote on issues, track resolutions, and maintain a leaderboard for a harmonious living experience.

## 🌟 Features

- **✅ User Authentication – Secure JWT-based login & registration**
- **✅ File Complaints – Log household issues (e.g., noise, cleanliness, bills, other)**
- **✅ Voting System – Upvote/downvote complaints for resolution priority**
- **✅ Gamification – Earn karma points & compete on the leaderboard**
- **✅ Punishment Generator – Auto-assign resolutions based on votes**
- **✅ Flat Statistics – Track common complaints & resolution trends**

## 🚀 **Live Demo**
- 🔗 **Frontend:** [Flatmate Conflict management System](https://flatmate-conflict-management-system.onrender.com)  
- 🔗 **Backend API:** [API Base URL](https://flatmate-conflict-management-system-1.onrender.com/api/auth) L


### 🛠️ **Tech Stack**
## **Frontend** (React + Vite)
- ⚛️ **React.js** – UI Framework  
- 🎨 **Tailwind CSS** – Styling  
- 🔗 **Axios** – API Requests  
- 🌍 **React Router** – Navigation  
- 🌐 **Vite** – Fast Development Server  


## **Backend** (Node.js + Express)
- 🛠️ **Express.js** – Backend Framework  
- 🛡️ **JWT Authentication** – Secure User Login  
- 🔒 **bcrypt.js** – Password Hashing  
- 🗄️ **MongoDB + Mongoose** – Database  


### 🏰️ Installation & Setup

## 1️⃣ Clone the Repository

- git clone https://github.com/aashishrewa2001/Flatmate-Conflict-Management-System.git
- cd Flatmate-Conflict-Management-System**

## 2️⃣ Backend Setup

- cd backend
- npm install

## 🔹 Configure Environment Variables (backend/.env****):

- PORT=5000
- MONGO_URI=your-mongodb-uri
- JWT_SECRET=your-secret-key
- CLIENT_URL=https://flatmate-conflict-management-system.onrender.com

## 🔹 Run Backend Server

- npm run dev  # Development Mode
- npm start    # Production Mode

## 3️⃣ Frontend Setup

- cd ../frontend
- npm install

## 🔹 Configure Environment Variables (frontend/.env****):

- VITE_BACKEND_URL=https://flatmate-conflict-management-system-1.onrender.com

## 🔹 Run Frontend

- npm run dev  # Open http://localhost:5173

### 🌀 API Endpoints

## 🔹 Authentication

**Method** – POST | **Endpoint** - /api/auth/register | **Description** - Register User
**Method** – POST | **Endpoint** - /api/auth/login | **Description** - Login & Get JWT Token

## 🔹 **Complaints**

**Method** – POST | **Endpoint** - /api/complaints | **Description** - File a Complaint
**Method** – GET | **Endpoint** - /api/complaints | **Description** - Get All Complaints
**Method** – PUT | **Endpoint** - /api/complaints/:id/resolve | **Description** - Mark Complaint as Resolved

## 🔹 **Voting**

**Method** – POST | **Endpoint** - /api/complaints/:id/vote | **Description** - Upvote/Downvote Complaint

## 🔹 **Leaderboard & Stats** 

**Method** – GET | **Endpoint** - /api/leaderboard | **Description** - Fetch Leaderboard
**Method** – GET | **Endpoint** - /api/flat/stats | **Description** - Fetch Flat Statistics

## 🔹 **Treading** 

**Method** – GET | **Endpoint** - /api/complaints/trending | **Description** - Register User

## 🔹 **Auto Punishment Generation** 

**Method** – POST | **Endpoint** - /api/punishments/:complaintId/punish | **Description** - Register User


### 🌍 **Deployment**

## 1️⃣ Deploy Backend on Render

**Push the latest code to GitHub**

- git add .
- git commit -m "Updated backend"
- git push origin main

## Deploy backend to Render**

**✅Go to Render**

**✅Create a Web Service**

**✅Connect your GitHub repository (backend/)**

**✅Set Environment Variables**

**✅Click Deploy**

## 2️⃣ Deploy Frontend on Render

**Build Frontend**

- cd frontend
- npm run build

## Deploy to Render (Static Site)

**✅Go to Render**

**✅Create a Static Site**

**✅Connect your GitHub repository (frontend/)**

**✅Set Build Command: npm run build**

**✅Set Publish Directory: dist/**

**✅Click Deploy**

## 🛠️ **Git Commands**

**Basic Git Workflow**

- git add .                # Stage all changes
- git commit -m "Message"  # Commit changes
- git push origin main     # Push to GitHub

**Pull Latest Changes**

**git pull origin main**

**Reset & Fix Errors**

- git reset --hard HEAD~1  # Undo last commit
- git status               # Check modified files

**Change Branch**

- git checkout -b feature-branch  # Create & switch to a new branch
- git checkout main               # Switch back to main branch

## 🎡 Project Status

- 👉 **Backend Deployed:** https://flatmate-conflict-management-system-1.onrender.com/
- **👉 Frontend Deployed:** https://flatmate-conflict-management-system.onrender.com


## 👨‍💻 Author

**👤 Aashish**

**GitHub**: [@aashishrewa2001](https://github.com/aashishrewa2001)

**LinkedIn**: [Profile](https://www.linkedin.com/in/aashish-vishwakarma-india/)

## 📜 License

This project is licensed under the MIT License – feel free to modify and use it for your own projects!

**🎉 Thank you for using QuirkyRoomie! If you like this project, ⭐ star the repo!**

