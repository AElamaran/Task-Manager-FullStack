import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTasksAPI,
  addTaskAPI,
  deleteTaskAPI,
  markTaskAsDoneAPI,
  searchTasksAPI,
  fetchCompletedTasksAPI,
} from './tasksAPI';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await fetchTasksAPI();
  return res.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const res = await addTaskAPI(task);
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteTaskAPI(id);
  return id;
});

export const markTaskAsDone = createAsyncThunk('tasks/markTaskAsDone', async (id) => {
  await markTaskAsDoneAPI(id);
  return id;
});

export const searchTasks = createAsyncThunk('tasks/searchTasks', async (keyword) => {
  const res = await searchTasksAPI(keyword);
  return res.data;
});

export const fetchCompletedTasks = createAsyncThunk('tasks/fetchCompletedTasks', async () => {
  const res = await fetchCompletedTasksAPI();
  return res.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    showModal: false,
  },
  reducers: {
    openModal(state) { state.showModal = true; },
    closeModal(state) { state.showModal = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.showModal = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      .addCase(markTaskAsDone.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { openModal, closeModal } = tasksSlice.actions;
export default tasksSlice.reducer;
