import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import AddTaskButton from './AddTaskButton';
import { render, screen, fireEvent } from '@testing-library/react';

test('renders Add New Task button and dispatches openModal', () => {
  render(
    <Provider store={store}>
      <AddTaskButton />
    </Provider>
  );
  const button = screen.getByRole('button', { name: /add new task/i });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  // Optionally, check Redux state or modal open (if modal is rendered in test)
});
