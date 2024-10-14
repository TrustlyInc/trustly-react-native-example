# Trustly React Native Example

## 1. Getting Started

### 1.1 Requirements

- **CocoaPods** 1.15
- **Node** 20
- **Ruby** 3.3.5
- **Yarn** 1.22.22

### 1.2 Setup

- Copy the `env.example.js` file to a new `env.js` file and fill out your environment variables.
- (Optional) Edit the payload information in the `establishData.js` file.

### 1.3 SDK Installation and Update

For the following commands, remember to replace these placeholders:

- `$APP_FOLDER`: Path of this **Example** folder
- `$SDK_FOLDER`: Path of the **SDK** folder

#### Step 1: Clean previous builds (if any)

```shell
cd $APP_FOLDER
rm -rfv node_modules && cd ios && rm -rfv build
```

#### Step 2: (Re)install packages

```shell
cd $APP_FOLDER
yarn install && yarn add $SDK_FOLDER
```

#### Step 3: Build

```shell
node ${APP_FOLDER}/node_modules/react-native/scripts/generate-codegen-artifacts.js --path ${APP_FOLDER}/ --outputPath ${SDK_FOLDER}/generated/ --targetPlatform all

cd $APP_FOLDER
cd android && ./gradlew generateCodegenArtifactsFromSchema
cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

### 1.4 Running

```shell
cd $APP_FOLDER
npx expo run
```
