import { useState } from 'react';
import AddTodo from '../addTodo/add-todo';
import TodoList from '../todo-list/todo-list';
import TodoTools from '../todo-tools/todo-tools';

export interface IItem {
  text: string;
  done: boolean;
  id: string;
}

const initialCards: IItem[] = [
  {
    id: '1',
    text: 'Купить продукты',
    done: false
  },
  {
    id: '2',
    text: 'Сделать домашнее задание',
    done: true
  },
  {
    id: '3',
    text: 'Позвонить маме',
    done: false
  },
  {
    id: '4',
    text: 'Записаться к врачу',
    done: false
  },
  {
    id: '5',
    text: 'Прочитать книгу',
    done: true
  }
];

function App() {
  const [todos, setTodos] = useState<IItem[]>(initialCards);
  const [view, setView] = useState<'All' | 'Active' | 'Completed'>('All');

  const addTodo = (text: string) => {
    const newTodo: IItem = {
      id: Date.now().toString(),
      text,
      done: false
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  const filteredTodos = todos.filter(todo => {
    if (view === 'Active') return !todo.done;
    if (view === 'Completed') return todo.done;
    return true;
  });

  return (
    <main className="min-h-screen flex flex-col w-full h-full bg-gray-100">
      <section className="w-full flex flex-col">
        <h1 className="text-[#e8d4c9] font-semibold text-6xl md:text-8xl tracking-tighter leading-tight my-8">
          todos
        </h1>
        <div className="relative flex flex-col justify-between max-w-2xl w-full mx-auto bg-white shadow-lg">
          <div className="z-[101]">
            <AddTodo onAddTodo={addTodo} />
            <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} view={view} />
            <TodoTools
              todos={todos}
              view={view}
              onViewChange={setView}
              onClearCompleted={clearCompleted}
            />
          </div>
          <div className="flex flex-col items-center mx-5">
            {todos.length !== 0 &&
              todos.map((item, index) => (
                <div
                  key={item.id}
                  className="absolute top-0 w-full h-full px-4 bg-white transition-all border-b-2 border-gray-300"
                  style={{
                    transform: `translateY(calc(${index + 1} * 4px))`,
                    zIndex: 100 - index,
                    maxWidth: `calc(100% - ${index * 10}px)`,
                    width: '100%'
                  }}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
