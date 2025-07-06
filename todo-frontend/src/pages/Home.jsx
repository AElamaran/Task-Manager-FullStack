import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import AddTaskButton from '../components/AddTaskButton';
import TaskModal from '../features/tasks/TaskModal';
import TaskList from '../components/TaskList';
import { fetchCompletedTasks, fetchTasks } from '../features/tasks/tasksSlice';

export default function Home() {
  // State to track if search results are being shown
  const [showingResults, setShowingResults] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const dispatch = useDispatch();

  const handleShowCompleted = () => {
    dispatch(fetchCompletedTasks());
    setShowCompleted(true);
  };
  const handleHideCompleted = () => {
    dispatch(fetchTasks());
    setShowCompleted(false);
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start">
      {/* Header */}
      <div className="w-full max-w-6xl px-4 md:px-0 mx-auto">
        <div className="text-center py-4 w-full">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">Task Manager</h1>
          <p className="text-gray-600 text-base md:text-lg">Organize your tasks efficiently</p>
        </div>

        {/* Main Content Responsive Layout */}
        <div className="flex-1 w-full flex flex-col min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 w-full flex-1 min-h-0 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
            {/* Sidebar - Quick Actions */}
            <aside className="bg-blue-50 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col min-h-[550px] min-w-0 max-w-full md:max-w-xs w-full border border-blue-100 mx-auto md:mx-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <SearchBar setShowingResults={setShowingResults} />
              <div className="my-4 border-t border-gray-200" />
              <AddTaskButton />
              <TaskModal />
            </aside>

            {/* Main Area - Your Tasks */}
            <main className="bg-blue-50 rounded-2xl shadow-lg p-4 md:p-8 h-full flex flex-col min-h-[550px] w-full border border-blue-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {showingResults ? 'Search Tasks' : showCompleted ? 'Completed Tasks' : 'Your Tasks'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {showingResults
                      ? 'Here are your search results.'
                      : showCompleted
                      ? 'All your completed tasks.'
                      : 'Manage and track your daily tasks'}
                  </p>
                </div>
                <div>
                  {!showCompleted ? (
                    <button
                      onClick={handleShowCompleted}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Completed Tasks
                    </button>
                  ) : (
                    <button
                      onClick={handleHideCompleted}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fff0f0] hover:bg-[#ffd6d6] text-[#800000] font-semibold shadow transition"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Close
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto min-h-[300px]">
                <TaskList showCompleted={showCompleted} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}