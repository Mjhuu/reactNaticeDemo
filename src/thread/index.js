import { self } from 'react-native-threads';

// listen for messages
self.onmessage = (message) => {
  console.log(message);
  // send a message, strings only
  function fibonacci(n) {
    if (n == 1 || n == 2) {
      return 1
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
  let res = fibonacci(5)
  self.postMessage('hello from other' + res + message);
}


