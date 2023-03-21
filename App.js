// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const handleLightboxWindowEvent = navState => {
  console.log("event", navState);
  if (navState.url) {
    const baseUrls = ["paywithmybank.com", "trustly.one"];
    const oauthLoginPath = "/oauth/login";
    if (navState.url.includes(baseUrls[0]) || navState.url.includes(baseUrls[1])) {
      console.log("lets open this thing!");
    }
  } else {
    return null;
  }
}

export default function App() {
  return (
    <WebView 
      source={{ uri: 'http://localhost:3000?integrationContext=InAppBrowser&urlScheme=trustly-react-native' }}
      onNavigationStateChange={handleLightboxWindowEvent}
      javaScriptEnabled={true}
      startInLoadingState
    />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
