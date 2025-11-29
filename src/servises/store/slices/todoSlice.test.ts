import reducer, { addTodo, toggleTodo, clearCompleted, setView } from './todoSlice';

test('addTodo добавляет элемент', () => {
  const state = reducer(undefined, addTodo('test'));
  expect(state.todos[0].text).toBe('test');
});

test('toggleTodo переключает done', () => {
  const id = '1';
  const initial = reducer(undefined, { type: '' });
  const state = reducer(initial, toggleTodo(id));

  expect(state.todos.find(t => t.id === id)?.done).toBe(true);
});

test('clearCompleted удаляет выполненные задачи', () => {
  const initial = reducer(undefined, { type: '' });
  const state = reducer(initial, clearCompleted());

  expect(state.todos.every(t => !t.done)).toBe(true);
});

test('setView меняет view', () => {
  const state = reducer(undefined, setView('Active'));
  expect(state.view).toBe('Active');
});
