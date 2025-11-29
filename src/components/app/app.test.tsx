import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app';
import { renderWithStore } from '../../../tests/helpers/renderWithStore';

const NEW_TODO = 'Новая задача';

describe('Todo App', () => {
  test('Добавление задачи через Enter', async () => {
    renderWithStore(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, `${NEW_TODO}{enter}`);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  test('Добавление задачи по клику на кнопку', async () => {
    renderWithStore(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByRole('button', { name: 'submit' });

    await userEvent.type(input, NEW_TODO);
    await userEvent.click(button);

    const matches = screen.getAllByText(NEW_TODO);
    expect(matches.length).toBeGreaterThan(1);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent(NEW_TODO);
  });

  test('Переключение view (All / Active / Completed)', () => {
    renderWithStore(<App />);

    const buttons = ['All', 'Active', 'Completed'];

    buttons.forEach(name => {
      const btn = screen.getByRole('button', { name });
      fireEvent.click(btn);

      expect(btn).toHaveClass('border');
    });
  });

  test('Отметить задачу и показать в Completed', async () => {
    renderWithStore(<App />);

    const checkBtns = screen.getAllByRole('button', { name: 'check' });

    fireEvent.click(checkBtns[0]);

    const completedBtn = screen.getByRole('button', { name: 'Completed' });
    fireEvent.click(completedBtn);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  test('Очистить завершённые задачи', async () => {
    renderWithStore(<App />);

    const checkBtns = screen.getAllByRole('button', { name: 'check' });
    fireEvent.click(checkBtns[0]);

    const clearBtn = screen.getByRole('button', { name: 'clear' });
    fireEvent.click(clearBtn);

    const completedBtn = screen.getByRole('button', { name: 'Completed' });
    fireEvent.click(completedBtn);

    expect(await screen.findByText('Nothing in Completed')).toBeInTheDocument();
  });
});
