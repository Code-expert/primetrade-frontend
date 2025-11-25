# Task Manager - Frontend

A modern, responsive React application for managing tasks with role-based access control. This frontend connects to the Task Manager REST API for authentication and task management.

## 🚀 Tech Stack

- **Framework:** React 18
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context (Auth)
- **Build Tool:** Create React App

## ✨ Features

### Core Features

- ✅ User authentication (Login/Register)
- ✅ Protected routes with JWT
- ✅ Role-based UI (User & Admin)
- ✅ Task CRUD operations
- ✅ Real-time task status updates
- ✅ Responsive design (mobile-first)
- ✅ Error handling with user feedback

### User Interface

- Clean and modern dashboard
- Color-coded task priorities (low, medium, high)
- Status badges (pending, in-progress, completed)
- Inline task status updates
- Create task modal/form
- Empty states for better UX

### Admin Features

- View all users' tasks
- See task creator information (name & email)
- Update any task
- Delete any task
- Visual distinction for admin-only content

### User Features

- View only their own tasks
- Create new tasks
- Update own tasks
- Delete own tasks
- Filter tasks by status and priority

## 📁 Project Structure

frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── Login.jsx # Login form
│ │ │ └── Register.jsx # Registration form
│ │ ├── Dashboard/
│ │ │ ├── Dashboard.jsx # Main dashboard
│ │ │ └── TaskList.jsx # Task list with cards
│ │ └── Layout/
│ │ ├── Navbar.jsx # Navigation bar
│ │ └── ProtectedRoute.jsx # Route guard
│ ├── services/
│ │ ├── api.js # Axios instance & interceptors
│ │ └── authService.js # Auth methods
│ ├── App.jsx # Main app component
│ ├── index.js # Entry point
│ └── index.css # Tailwind CSS imports
├── package.json
├── tailwind.config.js
└── README.md


## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Step 1: Clone the Repository

git clone <your-repo-url>
cd frontend



### Step 2: Install Dependencies

npm install



### Step 3: Configure Environment (Optional)

Create `.env` file in the root:

REACT_APP_API_URL=http://localhost:5000/api/v1



### Step 4: Start Development Server

npm start



Application will open at [**http://localhost:5173**](http://localhost:3000)

## 📦 Dependencies

{
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.20.0",
"axios": "^1.6.2",
"tailwindcss": "^4.0.0"
}



## 🎨 UI Components

### Authentication

#### Login Page
- Email and password inputs
- Form validation
- Error messages
- Link to registration

#### Register Page
- Name, email, password, role inputs
- Client-side validation
- Success/error feedback
- Link to login

### Dashboard

#### Navbar
- User name and role badge
- Logout button
- Responsive design

#### Task List
- Grid layout (responsive)
- Task cards with:
  - Title and description
  - Status and priority badges
  - Due date
  - Creator info (admin only)
  - Status dropdown
  - Delete button

#### Create Task Form
- Title input
- Description textarea
- Status dropdown
- Priority dropdown
- Due date picker
- Submit button

## 🔐 Authentication Flow

1. User enters credentials
2. Frontend sends POST to `/api/v1/auth/login`
3. Backend returns JWT token
4. Token stored in `localStorage`
5. Token attached to all API requests via Axios interceptor
6. On 401 error, user redirected to login

## 🎯 API Integration

### Axios Instance

import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5000/api/v1'
});

// Request interceptor - Add JWT token
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
(response) => response,
(error) => {
if (error.response?.status === 401) {
localStorage.removeItem('token');
window.location.href = '/login';
}
return Promise.reject(error);
}
);



### API Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Register new user |
| `/auth/login` | POST | Login user |
| `/auth/me` | GET | Get current user |
| `/tasks` | GET | Get all tasks |
| `/tasks` | POST | Create task |
| `/tasks/:id` | PUT | Update task |
| `/tasks/:id` | DELETE | Delete task |

## 🎨 Tailwind CSS v4 Configuration

### Custom Theme

@import "tailwindcss";

@theme {
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
}

@layer components {
.btn-primary {
background-color: var(--color-primary-600);
color: white;
padding: 0.5rem 1.5rem;
border-radius: 0.5rem;
font-weight: 500;
}

.card {
background-color: white;
border-radius: 0.5rem;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
padding: 1.5rem;
}
}



## 🚀 Build for Production

Create optimized production build
npm run build

Build output in /build folder
Deploy to Vercel, Netlify, or any static host


## 📱 Responsive Design

- **Mobile:** Single column layout
- **Tablet:** 2 column grid
- **Desktop:** 3 column grid
- Hamburger menu for mobile (optional enhancement)

## 🧪 Testing the Application

### Test User Account
Email: user@example.com
Password: user123



### Test Admin Account
Email: admin@example.com
Password: admin123



### Test Flow

1. **Register:** Create new account
2. **Login:** Use test credentials
3. **Create Task:** Add a task with all fields
4. **View Tasks:** See task in list
5. **Update Status:** Change status via dropdown
6. **Delete Task:** Click delete button
7. **Test Admin:** Login as admin, see all tasks with creator info

## 🌐 Deployment

### Deploy to Vercel

Install Vercel CLI
npm i -g vercel

Deploy
vercel



### Deploy to Netlify

Build
npm run build

Deploy build folder to Netlify


### Environment Variables for Production

REACT_APP_API_URL=https://your-backend-url.com/api/v1



## 📝 Available Scripts

npm start # Start development server
npm run build # Build for production
npm test # Run tests (if configured)
npm run eject # Eject from CRA (not recommended)



## 🐛 Troubleshooting

### CORS Errors
Make sure backend CORS is configured for `http://localhost:3000`

### Token Not Working
Check that token is stored in localStorage and axios interceptor is configured

### Tailwind Not Working
Ensure `tailwind.config.js` and `index.css` are properly configured

## 🔮 Future Enhancements

- Task filtering by date range
- Search functionality
- Dark mode toggle
- Task sorting options
- Drag and drop task reordering
- Real-time updates with WebSockets

## 📄 License

MIT


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
