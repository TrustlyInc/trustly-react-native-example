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
cd ios && pod install
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