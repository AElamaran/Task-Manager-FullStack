import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/tasks/tasksSlice';

export default function AddTaskButton() {
  const dispatch = useDispatch();
  
  return (
    <div className="space-y-2">
      <button
        onClick={() => dispatch(openModal())}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="text-lg">Add New Task</span>
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        Click to create a new task
      </p>
    </div>
  );
}