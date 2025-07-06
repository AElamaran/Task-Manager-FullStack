import tasksReducer, { openModal, closeModal } from '../features/tasks/tasksSlice';

describe('tasksSlice', () => {
  it('should handle openModal', () => {
    const initialState = { showModal: false, items: [], status: 'idle', error: null };
    const nextState = tasksReducer(initialState, openModal());
    expect(nextState.showModal).toBe(true);
  });

  it('should handle closeModal', () => {
    const initialState = { showModal: true, items: [], status: 'idle', error: null };
    const nextState = tasksReducer(initialState, closeModal());
    expect(nextState.showModal).toBe(false);
  });
});
