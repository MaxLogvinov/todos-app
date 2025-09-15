import { useDispatch } from 'react-redux';
import { toggleTodo } from '../../servises/store/slices/todoSlice';
import type { IItem } from '../../utils/types';

function TodoItem({ text, done, id }: IItem) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  return (
    <li className="px-3 py-4 border-b border-gray-200 flex items-center">
      <button
        aria-label="check"
        onClick={handleToggle}
        className={`w-8 h-8 bg-transparent border-2 rounded-full cursor-pointer ${
          done
            ? 'border-green-400 bg-[url("/check.png")] bg-contain bg-center bg-no-repeat'
            : 'border-gray-200'
        }`}
      />
      <p
        className={`m-0 pl-5 text-xl md:text-2xl truncate ${
          done ? 'line-through text-gray-300' : ''
        }`}
      >
        {text}
      </p>
    </li>
  );
}

export default TodoItem;
