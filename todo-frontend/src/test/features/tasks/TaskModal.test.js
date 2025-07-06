import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import TaskModal from '../features/tasks/TaskModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  store.dispatch({ type: 'tasks/openModal' });
});

test('shows error when submitting empty title', async () => {
  render(
    <Provider store={store}>
      <TaskModal />
    </Provider>
  );
  const addButton = screen.getByRole('button', { name: /add task/i });
  await userEvent.click(addButton);
  expect(screen.getByText(/title is required/i)).toBeInTheDocument();
});

test('submits valid task and clears input', async () => {
  render(
    <Provider store={store}>
      <TaskModal />
    </Provider>
  );
  const titleInput = screen.getByPlaceholderText(/task title/i);
  await userEvent.type(titleInput, 'My Task');
  const addButton = screen.getByRole('button', { name: /add task/i });
  await userEvent.click(addButton);
  expect(titleInput.value).toBe('');
});
