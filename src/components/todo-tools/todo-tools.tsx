import type { IItem } from '../../utils/types';

interface TodoToolsProps {
  todos: IItem[];
  view: 'All' | 'Active' | 'Completed';
  onViewChange: (view: 'All' | 'Active' | 'Completed') => void;
  onClearCompleted: () => void;
}

function TodoTools({ todos, view, onViewChange, onClearCompleted }: TodoToolsProps) {
  const activeList = todos.filter((item: IItem) => item.done === false);

  function handleClickView(newView: 'All' | 'Active' | 'Completed') {
    onViewChange(newView);
  }

  function formatText() {
    const item = activeList.length > 1 ? 'items' : 'item';
    return activeList.length !== 0 ? `${activeList.length} ${item} left` : '';
  }

  return (
    <div className="flex w-full items-center font-light p-3 border-t border-gray-200 shadow-lg box-border">
      <p className="m-0 w-1/3 text-left">{formatText()}</p>

      <div className="flex text-center w-2/5 justify-center">
        <button
          aria-label="All"
          onClick={() => handleClickView('All')}
          className={`bg-transparent border-none rounded cursor-pointer px-2 py-1 ${
            view === 'All' ? 'border border-pink-200' : ''
          }`}
        >
          All
        </button>
        <button
          aria-label="Active"
          onClick={() => handleClickView('Active')}
          className={`bg-transparent border-none rounded cursor-pointer px-2 py-1 mx-3 ${
            view === 'Active' ? 'border border-pink-200' : ''
          }`}
        >
          Active
        </button>
        <button
          aria-label="Completed"
          onClick={() => handleClickView('Completed')}
          className={`bg-transparent border-none rounded cursor-pointer px-2 py-1 ${
            view === 'Completed' ? 'border border-pink-200' : ''
          }`}
        >
          Completed
        </button>
      </div>

      <div className="w-1/3 text-right">
        <button
          aria-label="clear"
          onClick={onClearCompleted}
          className="bg-transparent border-none rounded cursor-pointer px-2 py-1"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoTools;
