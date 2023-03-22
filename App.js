// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

const waitForLoad =  async timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
};

class App extends Component {
  constructor(props) {
    super(props)
  }

  openOAuthLink = async link => {
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(link, '', { modalPresentationStyle: "fullscreen"})
          .then(response => {
            this.handleOAuthResult(response);
          })
        await waitForLoad(800);
        // log InAppBrowser error
        console.log(JSON.stringify(result));
        return result;
      } else {
        // consider opening in browser
        throw "InAppBrowser is not available";
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleOAuthResult = result => {    
    if (result.type === 'success') {
      this.webview.injectJavaScript('window.Trustly.proceedToChooseAccount();');
    }
  };

  handleLightboxWindowEvent = async (navState, callBack) => {
    // check for url in navigation event
    if (navState.url) {
      const baseUrls = ["paywithmybank.com", "trustly.one"];
      const oauthLoginPath = "/oauth/login";
      if (navState.url.includes(oauthLoginPath) && (navState.url.includes(baseUrls[0]) || navState.url.includes(baseUrls[1]))) {
        // user selected an OAuth bank
        await this.openOAuthLink(navState.url);
      }
    } else {
      return null;
    }
  }

  // handleLightboxMessage = async (event) => {
  //   console.log(event);
  // }

  render(){
    return (
      <WebView
        source={{ uri: 'http://localhost:3000?integrationContext=InAppBrowser&urlScheme=trustly-react-native' }}
        ref={(ref) => (this.webview = ref)}
        onNavigationStateChange={this.handleLightboxWindowEvent}
        // onMessage={this.handleLightboxMessage}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        startInLoadingState />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;