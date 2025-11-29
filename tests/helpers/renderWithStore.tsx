import { Provider } from 'react-redux';
import { store } from '../../src/servises/store';
import { render } from '@testing-library/react';
import React from 'react';

export function renderWithStore(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}
