import React, { Component } from 'react';
import { 
  SafeAreaView,
  StyleSheet
} from 'react-native';
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
        const result = InAppBrowser.openAuth(link, '', { modalPresentationStyle: "fullscreen"})
          .then(response => {
            this.handleOAuthResult(response);
          })
        await waitForLoad(800);
        // log InAppBrowser error
        console.log(JSON.stringify(result));
        return result;
      } else {
        // consider opening in browser as fallback
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

  handleOAuthMessage = message => {
    const data = message.nativeEvent ? message.nativeEvent.data : null;
    if ( data && typeof data == 'string') {
      const [command, ...params] = data.split("|");
      if(command.includes("ExternalBrowserIntegration")) {
        const messageUrl = params[1];
        const approvedBaseUrls = ["paywithmybank.com", "trustly.one"];
        const oauthLoginPath = "/oauth/login";
        if (messageUrl.includes(oauthLoginPath) && (messageUrl.includes(approvedBaseUrls[0]) || messageUrl.includes(approvedBaseUrls[1]))) {
          // user selected an OAuth bank
          // console.log(messageUrl);
          this.openOAuthLink(messageUrl);
        }   
      }
    }
  }

  render(){
    
    const postMessageForOauth = 
    `window.addEventListener(
        "message",
        function (event) {
          var data = (event || {}).data || {}
          window.ReactNativeWebView.postMessage(event.data);
        },
        false
      );`;

    return (
      <SafeAreaView style={{flex: 1, height: '100%'}}>
        <WebView
          ref={(ref) => (this.trustlyWebview = ref)}
          source={{ uri: 'http://localhost:3000?integrationContext=InAppBrowserNotify&urlScheme=trustly-react-native' }}
          injectedJavaScript={postMessageForOauth}
          onMessage={this.handleOAuthMessage}
          javaScriptEnabled={true}
          startInLoadingState 
        />
        </SafeAreaView>
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