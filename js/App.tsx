/**
 * @format
 */

import React, { StrictMode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TrustlyWidget } from 'trustly-react-native-sdk';

import EstablishData from './constants/EstablishData';

export default function App() {
  return (
    <StrictMode>
      <View style={styles.container}>
        <TrustlyWidget establishData={EstablishData} style={{ height: '100%', width: '100%' }} />
      </View>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 25,
  },
});
