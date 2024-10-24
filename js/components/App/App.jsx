/**
 * @format
 * @flow strict
 */
/* eslint-disable import/no-unresolved */

import React, { StrictMode } from 'react';
// $FlowFixMe[nonstrict-import]
import { View } from 'react-native';
// $FlowFixMe[cannot-resolve-module]
import { TrustlyWidget } from 'trustly-react-native-sdk';

import type { Node } from 'react';

import EstablishData from '../../constants/EstablishData';

import Styles from './App.styles';

export default function App(): Node {
  return (
    <StrictMode>
      <View style={Styles.container}>
        <TrustlyWidget establishData={EstablishData} style={{ height: '100%', width: '100%' }} />
      </View>
    </StrictMode>
  );
}
