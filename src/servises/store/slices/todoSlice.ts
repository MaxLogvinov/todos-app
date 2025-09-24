import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IItem {
  text: string;
  done: boolean;
  id: string;
}

interface TodoState {
  todos: IItem[];
  view: 'All' | 'Active' | 'Completed';
}

const initialState: TodoState = {
  todos: [
    {
      id: '1',
      text: 'Тестовое задание',
      done: false
    },
    {
      id: '2',
      text: 'Прекрасный код',
      done: true
    },
    {
      id: '3',
      text: 'Покрытие тестами',
      done: false
    },
    {
      id: '4',
      text: 'Залить на стенд',
      done: false
    },
    {
      id: '5',
      text: 'Сдача задания',
      done: true
    }
  ],
  view: 'All'
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: IItem = {
        id: Date.now().toString(),
        text: action.payload,
        done: false
      };
      state.todos.unshift(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(item => item.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    clearCompleted: state => {
      state.todos = state.todos.filter(item => !item.done);
    },
    setView: (state, action: PayloadAction<'All' | 'Active' | 'Completed'>) => {
      state.view = action.payload;
    }
  }
});

export const { addTodo, toggleTodo, clearCompleted, setView } = todoSlice.actions;
export default todoSlice.reducer;
