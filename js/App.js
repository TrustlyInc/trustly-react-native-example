/**
 * @format
 * @flow strict
 */

import React, { StrictMode } from 'react';
// $FlowFixMe[nonstrict-import]
import { StyleSheet, View } from 'react-native';
// $FlowFixMe[cannot-resolve-module]
import { TrustlyWidget } from 'trustly-react-native-sdk';

import type { Node } from 'react';

import establishData from './establish-data';

export default function App(): Node {
  return (
    <StrictMode>
      <View style={styles.container}>
        <TrustlyWidget establishData={establishData} style={{ height: '100%', width: '100%' }} />
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
    paddingBlock: 100,
    paddingInline: 25,
  },
});
