// Testing Components
import React from 'react';
import {render} from '@testing-library/react-native';
import Hello from '../components/Hello.js';

describe('Hello component', () => {
  it('should render "Hello World" text', () => {
    const {getByText} = render(<Hello />);
    expect(getByText('Hello World')).toBeTruthy();
  });
});
