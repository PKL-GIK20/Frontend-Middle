// Testing Components with Props
import React from 'react';
import {render} from '@testing-library/react-native';
import Greeting from '../components/Greeting.js';

describe('Greeting component', () => {
  it('should render "Hello Alice" text when name prop is "Alice"', () => {
    const {getByText} = render(<Greeting name="Alice" />);
    expect(getByText('Hello Alice')).toBeTruthy();
  });
});
