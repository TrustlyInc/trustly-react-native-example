/**
 * @format
 * @flow strict
 */

// $FlowFixMe[nonstrict-import]
import { StyleSheet } from 'react-native';
// $FlowFixMe[nonstrict-import]
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type StylesProp = { [key: string]: ViewStyleProp };

const Styles: StylesProp = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingBlock: 100,
    paddingInline: 25,
  },
});

export default Styles;
