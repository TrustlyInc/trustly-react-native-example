/**
 * @format
 */

import React, { StrictMode } from 'react';
import { View } from 'react-native';
import { TrustlyWidget } from 'trustly-react-native-sdk';

import EstablishData from '../../constants/EstablishData';

import Styles from './App.styles';

export default function App() {
  return (
    <StrictMode>
      <View style={Styles.container}>
        <TrustlyWidget establishData={EstablishData} style={{ height: '100%', width: '100%' }} />
      </View>
    </StrictMode>
  );
}
