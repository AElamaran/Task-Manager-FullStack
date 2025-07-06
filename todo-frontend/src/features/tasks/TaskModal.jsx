import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, closeModal } from './tasksSlice';

export default function TaskModal() {
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.tasks.showModal);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (showModal) {
      setTitle('');
      setDescription('');
      setError('');
    }
  }, [showModal]);

  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (title.length > 100) {
      setError('Title must be under 100 characters');
      return;
    }
    dispatch(addTask({ title, description }));
    setTitle('');
    setDescription('');
    setError('');
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(239,246,255,0.85) 0%, rgba(224,231,255,0.85) 100%)', backdropFilter: 'blur(6px)'}}>
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-lg mx-4 p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute -top-5 right-4 bg-white border border-[#800000] rounded-full p-2 shadow hover:bg-[#ffd6d6] hover:text-[#800000] transition"
          onClick={() => dispatch(closeModal())}
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">Add a Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <div className="relative">
            <input
              id="task-title"
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              placeholder="Task title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <label
              htmlFor="task-title"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Title
            </label>
          </div>
          <div className="relative">
            <textarea
              id="task-desc"
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-black text-base min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              placeholder="Task description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <label
              htmlFor="task-desc"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Description
            </label>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-[#800000] bg-[#fff0f0] text-[#800000] font-semibold hover:bg-[#ffd6d6] transition w-full sm:w-auto"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-900 hover:bg-blue-700 text-white font-semibold transition w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
