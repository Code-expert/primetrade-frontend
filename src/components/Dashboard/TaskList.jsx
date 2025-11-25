import React from 'react';
import { authService } from '../../services/authService';

const TaskList = ({ tasks, onDelete, onStatusChange }) => {
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return styles[priority] || styles.medium;
  };

  const getStatusBadge = (status) => {
    const styles = {
      'pending': 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return styles[status] || styles.pending;
  };

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-gray-500">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div key={task._id} className="card hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
              {task.title}
            </h3>
            <div className="flex flex-col gap-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          {isAdmin && task.user && (
            <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Created by: {task.user.name}</p>
                </div>
              </div>
            </div>
          )}

          
          {task.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {task.description}
            </p>
          )}

          {/* Due date */}
          {task.dueDate && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {/* Created date */}
          <div className="flex items-center text-xs text-gray-400 mb-4">
            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task._id, e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => onDelete(task._id)}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
