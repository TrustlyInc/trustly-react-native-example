import { render } from '@testing-library/react-native';
import React from 'react';
import { TrustlyWidget } from 'trustly-react-native-sdk';

import App from './App';

import establishData from './establish-data';

jest.mock(
  'trustly-react-native-sdk',
  () => {
    return {
      TrustlyWidget: jest.fn(() => null),
    };
  },
  { virtual: true },
);

describe('render widget properly', () => {
  it('should render successfully', () => {
    render(<App />);
    expect(TrustlyWidget).toHaveBeenCalled();
  });

  it('should render with correct props', () => {
    render(<App />);
    expect(TrustlyWidget).toHaveBeenCalledWith(expect.objectContaining({ establishData }), {});
  });
});
