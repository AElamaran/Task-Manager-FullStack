import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchTasks, fetchTasks } from '../features/tasks/tasksSlice';

export default function SearchBar({ setShowingResults }) {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (keyword.trim() === '') {
      dispatch(fetchTasks());
      setShowingResults(false);
    } else {
      dispatch(searchTasks(keyword));
      setShowingResults(true);
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    if (e.target.value.trim() === '') {
      setShowingResults(false);
      dispatch(fetchTasks());
    }
  };

  const handleClearSearch = () => {
    setKeyword('');
    setShowingResults(false);
    dispatch(fetchTasks());
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search Tasks
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
          placeholder="Search your tasks..."
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        {keyword && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full border border-red-500 bg-white p-0 focus:outline-none"
            style={{ boxShadow: 'none', background: 'white' }}
            aria-label="Clear search"
            type="button"
          >
            <svg className="h-3.5 w-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    <button
      onClick={handleSearch}
      type="button"
      className="
        w-full
        flex items-center justify-center gap-2
        rounded-lg
        bg-blue-900
        hover:bg-blue-700
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2
        text-white
        font-semibold
        py-3 px-4
        shadow
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span>Search</span>
    </button>

    </div>
  );
}