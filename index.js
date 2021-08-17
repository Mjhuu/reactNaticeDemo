/**
 * @format
 */

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import RNRestart from 'react-native-restart';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import PushNotification from 'react-native-push-notification';


PushNotification.createChannel({
    channelId: "icloud_download", // (required)
    channelName: "icloud_download", // (required)
  },
  (created) => console.log(`CreateChannel returned '${created}'`)
);

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      'js Unexpected error occurred',
      `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        We will need to restart the app.
        `,
      [{
        text: 'Restart',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler);

setNativeExceptionHandler((errorString) => {
  Alert.alert(
    'native Unexpected error occurred',
    `
        Error: 'Fatal:' ${errorString}

        We will need to restart the app.
        `,
    [{
      text: 'Restart',
      onPress: () => {
        RNRestart.Restart();
      }
    }]
  );
});

AppRegistry.registerComponent(appName, () => App);
