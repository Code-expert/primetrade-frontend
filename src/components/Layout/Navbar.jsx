import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">{user?.name}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user?.role === 'admin' 
                ? 'bg-yellow-500 text-yellow-900' 
                : 'bg-blue-200 text-blue-900'
            }`}>
              {user?.role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
