import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App wrapper with content', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).not.toBeEmptyDOMElement();
});
