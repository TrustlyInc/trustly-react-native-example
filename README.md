# Trustly React Native Example

> [!WARNING]  
> Work in progress, not yet complete and unreleased.

## Getting Started

### Requirements

- **CocoaPods** 1.15
- **Node** 20
- **Ruby** 3.3.5
- **Yarn** 1.22.22

### Setup

- Copy the `env.example.js` file to a new `env.js` file and fill out your environment variables.
- (Optional) Edit the payload information in the `establish-data.js` file.

### SDK Installation and Update

For the following commands, remember to replace these placeholders:

- `$APP_FOLDER`: Path of this **Example** folder
- `$SDK_FOLDER`: Path of the **SDK** folder

#### Clean previous builds (if any)

```shell
cd $APP_FOLDER
rm -rfv node_modules && cd ios && rm -rfv build
```

#### (Re)install packages

```shell
cd $APP_FOLDER
yarn install && yarn add $SDK_FOLDER
```

#### Build

```shell
node ${APP_FOLDER}/node_modules/react-native/scripts/generate-codegen-artifacts.js --path ${APP_FOLDER}/ --outputPath ${SDK_FOLDER}/generated/ --targetPlatform all

cd $APP_FOLDER
cd android && ./gradlew generateCodegenArtifactsFromSchema
cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

### Running

```shell
cd $APP_FOLDER
npx expo run
```

## Contributing

### Setup

We recommend the [**Visual Studio Code**](https://code.visualstudio.com/) as the code editor. There are some [settings](.vscode/settings.json) for it versioned in this repository, but, please, also install its recommended [extensions](.vscode/extensions.json).
