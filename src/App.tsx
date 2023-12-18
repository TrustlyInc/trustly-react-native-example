import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import { widget, lightbox } from "./trustly";
import { shouldOpenInAppBrowser } from "./oauth-utils";
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getRequestSignature } from "./utils/signature";
import { EstablishData } from "./types";
import { MaskedTextInput} from "react-native-mask-text";

export default class App extends Component {
  trustlyWebView = null;

  ACCESS_ID = "TSwGyK52Mnpt5b8C";
  MERCHANT_ID = "1127";
  MERCHANT_REFERENCE = "g:cac73df7-52b4-47d7-89d3-9628d4cfb65e";

  state = {
    amount: '',
    step: 'widget',
    returnParameters: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (async () => {
      const establishData: EstablishData = {
        accessId: this.ACCESS_ID,
        description: "transaction description",
        merchantId: this.MERCHANT_ID,
        currency: "USD",
        amount: "2.00",
        merchantReference: this.MERCHANT_REFERENCE,
        paymentType: "Retrieval",
        returnUrl: "/returnUrl",
        cancelUrl: "/cancelUrl",
        customer: {
          name: "John",
          address: {
            country: "US",
          },
        },
        metadata: {
          integrationContext: "InAppBrowserNotify",
          urlScheme: "in-app-browser-rn://"
        },
      }

      // const requestSignature = await getRequestSignature(establishData)
      // establishData.requestSignature = requestSignature

      this.setState(() => ({
        establishData: establishData
      }))
    })();
  }

  LoadingIndicatorView() {
    return (
      <ActivityIndicator color="#333" size="small" style={styles.loading} />
    );
  }

  async openLink(url: string) {
    try {
      if (await InAppBrowser.isAvailable()) {

        const result = await InAppBrowser.openAuth(url, '', {
          // iOS Properties
          ephemeralWebSession: true,
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'automatic',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        }).then((response) => {
          this.handleOAuthResult(response);
        });

      }
      else Linking.openURL(url)
    } catch (error) {
      console.log(error);
    }
  }

  handleOauthMessage = (message: any) => {
    const data = message.nativeEvent.data

    if (typeof data !== 'string') return;

    this.handlePaymentProviderId(data);
    this.handleWithCancelOrClose(data);
    this.handleClosePanelSuccess(data);

    var [command, ...params] = data.split("|");

    if (command.includes("ExternalBrowserIntegration")) {
      var messageUrl = params[1]

      if (shouldOpenInAppBrowser(messageUrl)) {
        this.openLink(messageUrl);
      }
    }

  }

  handlePaymentProviderId(data: string) {
    if(data.startsWith('PayWithMyBank.createTransaction')) {
      let splitedData = data.split('|')

      this.establishData.amount = this.state.amount;
      this.establishData.paymentProviderId = splitedData[1];
      
      this.goToAuthBankSelected();
    }
  }

  handleWithCancelOrClose(data: string) {
    if(data.endsWith('close|cancel|')) {
      this.setState({step: 'widget'});
    }
  }

  handleClosePanelSuccess(data: string) {
    if(data.startsWith('PayWithMyBank.closePanel|')) {
      let returnValues = data.split('|')[1];
      let returnParameters = returnValues.split('?')[1];

      this.setState({
        returnParameters: returnParameters,
        step: 'success'
      });

    }
  }

  handleOAuthResult = (result: any) =>{
    if (result.type === 'success') {
      this.trustlyWebView.injectJavaScript('window.Trustly.proceedToChooseAccount();');
    }
  }

  onChangeAmount = (amount: string) => {
    this.setState({amount});
  }

  goToAuthBankSelected = () => {
    this.setState({step: 'lightbox'});
  }

  onPressBackToWidget = () => {
    this.setState({
      step: 'widget',
      amount: '',
      returnParameters: '',
    });
  }

  postMessageForOauth = `
    window.addEventListener(
      "message",
      function (event) {
        var data = (event || {}).data || {}
        window.ReactNativeWebView.postMessage(event.data);
      },
      false
    );`;

  buildWidgetScreen = () => {

    const mask = '0.00';

    return <SafeAreaView style={styles.backgroundStyle}>

      <Text style={styles.amountText}>
        {`Amount:`}
      </Text>

      <MaskedTextInput
        type="currency"
        options={{
          prefix: '',
          decimalSeparator: '.',
          groupSeparator: ',',
          precision: 2
        }}
        onChangeText={(amount, rawAmount) => {
          this.onChangeAmount(amount);
        }}
        style={styles.input}
        keyboardType="numeric"
      />
        
      <WebView
          ref={(ref) => (this.trustlyWebView = ref)}
          source={{ html: widget(this.ACCESS_ID, this.establishData) }}
          renderLoading={this.LoadingIndicatorView}
          injectedJavaScript={this.postMessageForOauth}
          onMessage={this.handleOauthMessage}
          javaScriptEnabled={true}
          startInLoadingState
          style={styles.widget}
      />

    </SafeAreaView>
  }

  buildLightBoxScreen = () => {

    return <SafeAreaView style={styles.backgroundStyle}>
        
      <WebView
          ref={(ref) => (this.trustlyWebView = ref)}
          source={{ html: lightbox(this.ACCESS_ID, this.establishData) }}
          renderLoading={this.LoadingIndicatorView}
          injectedJavaScript={this.postMessageForOauth}
          onMessage={this.handleOauthMessage}
          javaScriptEnabled={true}
          startInLoadingState
          style={styles.widget}
      />

    </SafeAreaView>
  }

  buildResultScreen = () => {

    return <SafeAreaView style={styles.backgroundStyle}>

      <Text style={styles.amountText}>
        {`SUCCESS PAGE`}
      </Text>
        
      <Text style={styles.amountText}>
        {this.state.returnParameters}
      </Text>

      <TouchableOpacity
        style={styles.payButton}
        onPress={this.onPressBackToWidget} 
        >
        <Text style={{ color: '#fff' }}>Back to widget</Text>
      </TouchableOpacity>

    </SafeAreaView>
  }

  render() {
    return (

      (this.state.step === 'widget') ? this.buildWidgetScreen() : 
      (this.state.step === 'lightbox') ? this.buildLightBoxScreen() : this.buildResultScreen()

    );
  }
}

const styles = StyleSheet.create({

  backgroundStyle: {
    backgroundColor: Colors.lighter,
    flex: 1,
    height: '100%',
  },

  header: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 50,
  },

  widget: {
    width: '100%',
    height: '100%'
  },

  lightbox: {
    width: '100%',
    height: '100%'
  },

  footer: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 40,
    textAlign: 'center',
    color: "#fff"
  },

  footerText: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 40,
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
    paddingTop: 10
  },

  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: "100%",
    zIndex: 5,
  },

  loading: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    height: '100%' , 
    width: '100%'
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  amountText: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },

  payButton: {
    backgroundColor: '#147EFB', 
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    margin: 15,
  },

});
