import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App.js';

test('renders card items', () => {
  const { getByText } = render(<App />);

  expect(getByText('Card 1')).toBeTruthy();
  expect(getByText('Card 2')).toBeTruthy();
});

test('opens card 1 details modal on press', () => {
  const { getByText, queryByText } = render(<App />);

  fireEvent.press(getByText('Card 1'));

  expect(getByText('Description for Card 1')).toBeTruthy();
});

test('closes card1 details modal on close button press', () => {
  const { getByText, queryByText } = render(<App />);

  fireEvent.press(getByText('Card 1'));
  fireEvent.press(getByText('Close'));

  expect(queryByText('Description for Card 1')).toBeFalsy();
});
