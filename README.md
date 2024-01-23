# Trustly React Native Example

This example application demonstrates how the Trustly UI can be integrated with a React Native app. In addition to this example, also see the Trustly developer docs for [React Native](https://amer.developers.trustly.com/payments/docs/react-native) apps.

## Getting Started

### 1. Clone this repository

```shell
git clone git@github.com:TrustlyInc/trustly-react-native-example.git
```

### 2. Install dependencies

```shell
cd trustly-react-native-example && npm install
cd ios && pod install
```

### 3. Copy the `env.example.ts` file to a new `env.ts` file and fill out your environment variables

### 4. Start the app!

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

## Closing Chrome Custom Tab in Android

### RedirectActivity

When the application receive some action for example `in-app-browser-rn`, or the name that you defined in `urlScheme`, it will call your target Activity with some flags, and reload it.
The example below is from `RedirectActivity`

```java
    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
    startActivity(intent);
    finish();
```

### AndroidManifest

```xml
    <activity
    android:name=".RedirectActivity"
    android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="in-app-browser-rn" />
        </intent-filter>
    </activity>
```

## How integrate native components with Trustly webview

Some times you want to integrate the webview rendering Trustly widget with your native components in your application, like the image bellow:

<img src="docs/images/rn_print.png" width="25%" height="25%" style="display: block; margin: 0 auto" />

In this case, we need to avoid that `widget` call the `lightbox` immediatley when the user select a bank, because we need to get the amount value to fill the establish data first, so, for this beahvior we need to add a peace of javascript inside the `widget` like in the file `trustly.tsx` lines 19 to 23.

```js
const TrustlyWidgetBankSelected = (data) => {
  return false;
}

Trustly.selectBankWidget(establishData, TrustlyOptions, TrustlyWidgetBankSelected);
```

Now you must to implement in your `webview` a way to handle with 3 events triggered by the `widget` and `lightbox` to handle with the bank selection, close or cancel action and when the authorization finished.

- Bank selection event (`PayWithMyBank.createTransaction`): In this demonstration app, after select the bank, we redirect the user to the authentication page.

```js
handlePaymentProviderId(data: string) {
  if(data.startsWith('PayWithMyBank.createTransaction')) {
    let splitedData = data.split('|')

    this.establishData.amount = this.state.amount;
    this.establishData.paymentProviderId = splitedData[1];

    this.goToAuthBankSelected();
  }
}

goToAuthBankSelected = () => {
  this.setState({step: 'lightbox'});
}
```

- Close or cancel event (`close|cancel|`):

```js
handleWithCancelOrClose(data: string) {
  if(data.endsWith('close|cancel|')) {
    this.setState({step: 'widget'});
  }
}
```

- Finish authorization event (`PayWithMyBank.closePanel|`):

```js
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
```
