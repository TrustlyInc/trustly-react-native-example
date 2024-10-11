/**
 * @format
 * @flow strict-local
 */

import { StyleSheet, View } from 'react-native';
import TrustlyReactNativeSDK from 'trustly-react-native-sdk/js/TrustlyReactNativeSDKNativeComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <TrustlyReactNativeSDK
        url='https://www.trustly.com'
        style={{ height: '100%', width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
