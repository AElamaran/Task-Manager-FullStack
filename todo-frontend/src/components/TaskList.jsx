import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchCompletedTasks } from '../features/tasks/tasksSlice';
import TaskItem from '../features/tasks/TaskItem';

export default function TaskList({ showCompleted }) {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);
  const status = useSelector(state => state.tasks.status);

  useEffect(() => {
    if (showCompleted) {
      dispatch(fetchCompletedTasks());
    } else {
      dispatch(fetchTasks());
    }
  }, [dispatch, showCompleted]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (tasks.length === 0 && status === 'succeeded') {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
          <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first task!</p>
        <div className="text-sm text-gray-400">
          Click the "Add New Task" button to begin organizing your work.
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500 py-16">
        Failed to load tasks. Please check your API connection.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.filter(task => showCompleted || !task.completed).map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
