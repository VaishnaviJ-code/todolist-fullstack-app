# TaskHub - Full-Stack To-Do List Application

A professional, full-featured to-do list application built with modern web technologies. This project demonstrates a complete full-stack development workflow with authentication, real-time task management, and a beautiful responsive UI.

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks with ease
- **Status Tracking**: Mark tasks as pending or completed
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Client-side and server-side validation with clear error messages
- **Real-time Updates**: Optimistic UI updates with error rollback
- **Accessibility**: ARIA labels, keyboard navigation, and focus indicators
- **Delete Confirmation**: Confirmation dialog to prevent accidental deletions

## Tech Stack

### Frontend
- **React 18** - UI library with hooks and context API
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS v4** - Utility-first CSS framework
- **Context API** - State management for authentication and theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Project Structure

todolist-app/
│
├── backend/
│ ├── controllers/
│ │ ├── userController.js # Authentication logic
│ │ └── taskController.js # Task CRUD operations
│ ├── models/
│ │ ├── User.js # User schema with password hashing
│ │ └── Task.js # Task schema with user reference
│ ├── routes/
│ │ ├── userRoutes.js # /api/users endpoints
│ │ └── taskRoutes.js # /api/tasks endpoints
│ ├── middleware/
│ │ └── auth.js # JWT token verification
│ ├── server.js # Express app initialization
│ ├── package.json
│ └── .env # Environment variables
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ └── api.js # Axios instance with interceptors
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Global auth state & theme
│ │ ├── components/
│ │ │ ├── Header.jsx # Navigation bar
│ │ │ ├── TaskCard.jsx # Individual task display
│ │ │ ├── TaskModal.jsx # Create/Edit task modal
│ │ │ ├── ConfirmDialog.jsx # Delete confirmation
│ │ │ ├── ProtectedRoute.jsx # Route authentication guard
│ │ │ └── ThemeToggle.jsx # Dark/Light mode toggle
│ │ ├── pages/
│ │ │ ├── LoginPage.jsx # Login form page
│ │ │ ├── SignupPage.jsx # Signup form page
│ │ │ └── DashboardPage.jsx # Main task dashboard
│ │ ├── App.jsx # Main app component with routes
│ │ ├── main.jsx # React DOM root
│ │ └── index.css # Global styles + Tailwind
│ ├── vite.config.js # Vite + Tailwind configuration
│ ├── package.json
│ └── index.html
│
├── .gitignore # Git ignore rules
├── README.md # This file
└── .git/ # Git repository

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository:**
  git clone https://github.com/YOUR_USERNAME/todolist-app.git
  cd todolist-app
2. **Setup Backend:**
  cd backend
  npm install
  Create a `.env` file in the backend folder:
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist
    JWT_SECRET=your_super_secret_jwt_key_here
    PORT=5000
3. **Setup Frontend:**
   cd ../frontend
   npm install
4. **Run the Application:**
    Terminal 1 - Backend:
    cd backend
    npm run dev
   
    Terminal 2 - Frontend:
    cd frontend
    npm run dev

5. **Open in Browser:**
Visit `http://localhost:5173/`

## API Documentation

### Authentication Endpoints

**Signup:**
- `POST /api/users/signup`
- Body: `{ name, email, password }`

**Login:**
- `POST /api/users/login`
- Body: `{ email, password }`

### Task Endpoints (Protected)

**Create Task:**
- `POST /api/tasks`
- Body: `{ title, description }`

**Get All Tasks:**
- `GET /api/tasks`

**Update Task:**
- `PATCH /api/tasks/:id`
- Body: `{ title, description, status }`

**Delete Task:**
- `DELETE /api/tasks/:id`

## Usage

1. **Sign Up**: Create account with name, email, and password (min 6 chars, uppercase, lowercase, number)
2. **Login**: Enter credentials to access dashboard
3. **Create Task**: Click "Add Task" and fill in the form
4. **Manage Tasks**: Edit, delete, or mark complete
5. **Dark Mode**: Toggle theme with sun/moon icon
6. **Logout**: Click logout button

## Author

**Vaishnavi J**
- GitHub: https://github.com/VaishnaviJ-code
- Email: jvaishnavi2004@gmail.com

## License

This project is licensed under the MIT License.

## Acknowledgments

- Tailwind CSS
- React Router
- MongoDB
