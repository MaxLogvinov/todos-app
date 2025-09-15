import { type ChangeEvent, type FormEvent, useState } from 'react';

interface AddTodoProps {
  onAddTodo: (text: string) => void;
}

function AddTodo({ onAddTodo }: AddTodoProps) {
  const [todoText, setTodoText] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoText(e.target.value);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (todoText.trim()) {
      onAddTodo(todoText.trim());
      setTodoText('');
    }
  }

  return (
    <form
      className="flex w-full p-3 border-b border-gray-200 items-center"
      onSubmit={onSubmit}
      noValidate
    >
      <button
        aria-label="submit"
        className="w-8 h-8 bg-[url('/arrow.png')] bg-contain bg-center bg-no-repeat border-none cursor-pointer"
        type="submit"
      />
      <input
        type="text"
        placeholder="What needs to be done?"
        className="w-full border-none border-b border-transparent outline-none bg-transparent px-4 py-3 text-xl md:text-2xl placeholder:italic placeholder:text-gray-300 placeholder:font-normal focus:border-b focus:border-gray-300"
        onChange={handleChange}
        value={todoText}
        required
      />
    </form>
  );
}

export default AddTodo;
