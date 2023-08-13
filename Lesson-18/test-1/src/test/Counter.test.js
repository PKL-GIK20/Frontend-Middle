// Testing Components
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Counter from '../components/Counter.js';

describe('Counter component', () => {
  it('should render initial count as 0', () => {
    const {getByText} = render(<Counter />);
    expect(getByText('Count: 0')).toBeTruthy();
  });

  it('should increment count by 1 when "+" button is pressed', () => {
    const {getByText} = render(<Counter />);
    fireEvent.press(getByText('+'));
    expect(getByText('Count: 1')).toBeTruthy();
  });

  it('should decrement count by 1 when "-" button is pressed', () => {
    const {getByText} = render(<Counter />);
    fireEvent.press(getByText('-'));
    expect(getByText('Count: -1')).toBeTruthy();
  });
});
