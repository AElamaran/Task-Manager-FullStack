import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, markTaskAsDone } from './tasksSlice';

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-blue-50/60 rounded-xl shadow-md border border-blue-100 p-5 mb-4 flex items-start gap-4 transition hover:shadow-lg group backdrop-blur-sm">
      {/* Bullet and status */}
      <div className="flex flex-col items-center pt-1">
        <span className="text-blue-900 text-3xl select-none leading-none">•</span>
        {task.completed ? (
          <span className="mt-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-semibold">✓</span>
        ) : null}
      </div>
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-lg text-gray-800 truncate">{task.title}</span>
          {task.completed ? (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium">Completed</span>
          ) : (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#fff0f0] text-[#800000] font-medium">Pending...</span>
          )}
        </div>
        <div className="text-gray-500 text-sm break-words mb-1">{task.description}</div>
        {task.createdAt && (
          <div className="text-xs text-gray-400 mt-1">Created: {new Date(task.createdAt).toLocaleString()}</div>
        )}
      </div>
      {/* Actions */}
      <div className="flex flex-col gap-2 items-end min-w-[80px]">
        {!task.completed && (
          <button
            className="w-20 min-w-[80px] px-0 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-700 text-white text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            onClick={() => dispatch(markTaskAsDone(task.id))}
            title="Mark as Done"
          >
            Done
          </button>
        )}
        <button
          className="w-20 min-w-[80px] px-0 py-1.5 rounded-lg bg-[#800000] hover:bg-[#a83232] text-white text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] text-center"
          onClick={() => dispatch(deleteTask(task.id))}
          title="Delete Task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
