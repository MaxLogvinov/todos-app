import { useSelector } from 'react-redux';
import { type RootState } from '../../servises/store';
import AddTodo from '../addTodo/add-todo';
import TodoList from '../todo-list/todo-list';
import TodoTools from '../todo-tools/todo-tools';

function App() {
  const { todos, view } = useSelector((state: RootState) => state.todos);

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
            <AddTodo />
            <TodoList todos={filteredTodos} view={view} />
            <TodoTools todos={todos} view={view} />
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
