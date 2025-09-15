import TodoItem from '../todo-item/todo-item';
import type { IItem } from '../../utils/types';

interface TodoListProps {
  todos: IItem[];
  view: string;
}

function TodoList({ todos, view }: TodoListProps) {
  return (
    <div className="overflow-hidden overflow-y-auto h-48">
      <ul className="list-none m-0 p-0">
        {todos.length === 0 && (
          <h2 className="m-0 p-4 text-gray-300 w-full text-center box-border">
            {view === 'All' ? 'Add Todo' : 'Nothing in ' + view}
          </h2>
        )}
        {todos.map((item: IItem) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
