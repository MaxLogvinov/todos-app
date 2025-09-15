import { useDispatch } from 'react-redux';
import { setView, clearCompleted } from '../../servises/store/slices/todoSlice';
import type { IItem } from '../../utils/types';

interface TodoToolsProps {
  todos: IItem[];
  view: 'All' | 'Active' | 'Completed';
}

function TodoTools({ todos, view }: TodoToolsProps) {
  const dispatch = useDispatch();
  const activeList = todos.filter((item: IItem) => item.done === false);

  const handleClickView = (newView: 'All' | 'Active' | 'Completed') => {
    dispatch(setView(newView));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  function formatText() {
    const item = activeList.length > 1 ? 'items' : 'item';
    return activeList.length !== 0 ? `${activeList.length} ${item} left` : '';
  }

  return (
    <div className="flex w-full items-center font-light p-3 border-t border-gray-200 shadow-lg box-border flex-col md:flex-row">
      <p className="m-0 w-full md:w-1/3 text-center md:text-left mb-2 md:mb-0">{formatText()}</p>

      <div className="flex flex-col md:flex-row text-center w-full md:w-2/5 justify-center mb-2 md:mb-0">
        <button
          aria-label="All"
          onClick={() => handleClickView('All')}
          className={`bg-transparent active:scale-95 rounded cursor-pointer px-2 py-1 ${
            view === 'All' ? 'border border-pink-200' : 'border-none'
          }`}
        >
          All
        </button>
        <button
          aria-label="Active"
          onClick={() => handleClickView('Active')}
          className={`bg-transparent active:scale-95 rounded cursor-pointer px-2 py-1 mx-0 md:mx-3 my-1 md:my-0 ${
            view === 'Active' ? 'border border-pink-200' : 'border-none'
          }`}
        >
          Active
        </button>
        <button
          aria-label="Completed"
          onClick={() => handleClickView('Completed')}
          className={`bg-transparent active:scale-95 rounded cursor-pointer px-2 py-1 ${
            view === 'Completed' ? 'border border-pink-200' : 'border-none'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="w-full md:w-1/3 text-center md:text-right">
        <button
          aria-label="clear"
          onClick={handleClearCompleted}
          className="bg-transparent border-none rounded cursor-pointer px-2 py-1 active:scale-95 whitespace-nowrap"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoTools;
