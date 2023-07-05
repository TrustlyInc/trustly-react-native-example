# Trustly React Native Example

This example application demonstrates how the Trustly UI can be integrated with a React Native app. In addition to this example, also see the Trustly developer docs for [React Native](https://amer.developers.trustly.com/payments/docs/react-native) apps.

## Getting Started
Clone this repository

```shell
git clone git@github.com:TrustlyInc/trustly-react-native-example.git
```
Install dependencies

```shell
cd trustly-react-native-example && npm install
```

Replace the placeholder texts with your credentials:
```js
// App.tsx

accessId: "<YOUR_ACCESS_ID>",
merchantId: "<YOUR_MERCHANT_ID>",
merchantReference: "<unique reference code from your app>"
```

```js
// trustly.tsx

accessId: "<YOUR_ACCESS_ID>",
```

Start the app!
`npm start` or `npx react-native start` if you have not installed `react-native-cli`
## How it works

Integrations in React Native must inform the `integrationContext` parameter with the value `InAppBrowserNotify` in the establish data, as in the example below:

```javascript
let establishData = {
  ...
  metadata:{
    integrationContext: "InAppBrowserNotify",
    ...
  },
  ...
};
```

After that, when an Oauth bank is selected in the Trustly Lightbox, a message will be triggered and must be captured by the `onMessage` attribute of the WebView, as in the example below (and in the App.tsx file):

```js
<WebView
  ...
  onMessage={this.handleOauthMessage}
  ...
/>
```

The function informed in `onMessage` will receive the message with a url that must be opened in an in-app-browser, as in the example below (and in the App.tsx file):

```javascript
handleOauthMessage = (message: any) => {
  const data = message.nativeEvent.data

  if ( typeof data !== 'string') return;

  var [command, ...params] = data.split("|");

  if(command.includes("ExternalBrowserIntegration")) {
    var messageUrl = params[1]

    if( shouldOpenInAppBrowser(messageUrl) ) {
      this.openLink(messageUrl);
    }
  }
}
```
