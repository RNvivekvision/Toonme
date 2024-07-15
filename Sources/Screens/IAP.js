import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RNButton, RNText } from './Common';
import { FontFamily, FontSize } from './Theme';
import * as IAP from 'react-native-iap';

const skus = Platform.select({
  android: [],
  ios: [
    'com.cartoon.photo.editor.toonmeapp.monthly',
    'com.cartoon.photo.editor.toonmeapp.yearly',
  ],
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    init();
  }, []);

  const init = async () => {
    try {
      await IAP.initConnection();
      const subscriptions = await IAP.getSubscriptions({ skus: skus });
      console.log('Subscriptions -> ', JSON.stringify(subscriptions, null, 2));
    } catch (e) {
      console.error('Error getSubscriptions -> ', e);
    }
  };

  const onRequestSubscriptions = async () => {
    try {
      const response = await IAP.requestSubscription({ sku: skus[0] });
      console.log('Request -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.error('Error onRequestSubscriptions -> ', e);
    }
  };

  const onAvailablePurchase = async () => {
    try {
      const response = await IAP.getAvailablePurchases();
      console.log('Available Purchases -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.error('Error onAvailablePurchase -> ', e);
    }
  };

  const onValidateSubscription = async () => {
    try {
      const value = {};
    } catch (e) {
      console.error('Error onValidateSubscription -> ', e);
    }
  };

  return (
    <View style={styles.container}>
      <RNText size={FontSize.font24} family={FontFamily.SemiBold}>
        {true ? 'Connected' : 'Not Connected'}
      </RNText>
      <RNButton
        title={'Request Subscriptions'}
        onPress={onRequestSubscriptions}
      />

      <RNButton title={'Available Purchase'} onPress={onAvailablePurchase} />

      <RNButton
        title={'Validate Subscriptions'}
        onPress={onValidateSubscription}
      />
    </View>
  );
};

const sub = {
  month: {
    transactionDate: 1721021481108,
    productId: 'com.cartoon.photo.editor.toonmeapp.monthly',
    transactionReceipt:
      'MIAGCSqGSIb3DQEHAqCAMIACAQExDzANBglghkgBZQMEAgEFADCABgkqhkiG9w0BBwGggCSABIIBijGCAYYwDwIBAAIBAQQHDAVYY29kZTALAgEBAgEBBAMCAQAwLAIBAgIBAQQkDCJjb20uY2FydG9vbi5waG90by5lZGl0b3IudG9vbm1lYXBwMAsCAQMCAQEEAwwBMTAQAgEEAgEBBAgX/+f/AAAAADAcAgEFAgEBBBQEmcmXogp28dNmi77wSnM6Q6CkXjAKAgEIAgEBBAIWADAeAgEMAgEBBBYWFDIwMjQtMDctMTVUMDU6NDk6MzlaMIGuAgERAgEBBIGlMYGiMAwCAgalAgEBBAMCAQEwNAICBqYCAQEEKwwpY29tLmNhcnRvb24ucGhvdG8uZWRpdG9yLnRvb25tZWFwcC55ZWFybHkwDAICBqcCAQEEAwwBMDAfAgIGqAIBAQQWFhQyMDI0LTA3LTE1VDA1OjMxOjIxWjAfAgIGrAIBAQQWFhQyMDI0LTA4LTE1VDA1OjMxOjIxWjAMAgIGtwIBAQQDAgEAMB4CARUCAQEEFhYUNDAwMS0wMS0wMVQwMDowMDowMFoAAAAAAACgggN4MIIDdDCCAlygAwIBAgIBATANBgkqhkiG9w0BAQsFADBfMREwDwYDVQQDDAhTdG9yZUtpdDERMA8GA1UECgwIU3RvcmVLaXQxETAPBgNVBAsMCFN0b3JlS2l0MQswCQYDVQQGEwJVUzEXMBUGCSqGSIb3DQEJARYIU3RvcmVLaXQwHhcNMjAwNDAxMTc1MjM1WhcNNDAwMzI3MTc1MjM1WjBfMREwDwYDVQQDDAhTdG9yZUtpdDERMA8GA1UECgwIU3RvcmVLaXQxETAPBgNVBAsMCFN0b3JlS2l0MQswCQYDVQQGEwJVUzEXMBUGCSqGSIb3DQEJARYIU3RvcmVLaXQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDbf5A8LHMP25cmS5O7CvihIT7IYdkkyF4fdT7ak9sxGpGAub/lDMs8uw5EYib6BCm2Sedv4BvmDWjNJW7Ddgj1SguuenQ8xKkLs89iD/u0vPfbhF4o60cN8e2LrPWfsAk4o257yyZQChrhidFydgs5TMtPbsCzX7eVurmoXUp0q+9vQaV+CY26PT3NcFfY7e/V2nfIkwQc7wmIeGXOgfKNcucHGm4mEvcysQ27OJBrBsT8DeWVUM2RyLol9FjJjOFx20pF8y0ZlgNWgaZE7nV3W1PPeKxduj5fUCtcKYzdwtcqF98itNfkeKivqG2nwdpoLWbMzykLUCzjwvvmXxLBAgMBAAGjOzA5MA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/BAQDAgKEMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMDMA0GCSqGSIb3DQEBCwUAA4IBAQCyAOA88ejpYr3A1h1Anle5OJB3dlLSqEtwbrhnmfuzilWf7x0ouF8q0XOfNUc3u0bTdhDy8GnszWKZcflgioRIOMS9i2cluatsM2Wt2MKaeEgP6czBJw3Gz2Q8bYBZM4zKNgYqERuNSc4I/2bARyhL61rBKwlWLKWqCQN7MjHc6IV4SM7AxRIRag8Mri8Fym96ZH8gLHXmTLES0/3jH14NfbhY16B85H9jq5eaK8Mq2NCy4dVaDTkbb2coqRKD1od4bZm9XrMK4JjO9urDjm1p67dAgT2HPXBR0cRdjaXcf2pYGt5gdjdS7P+sGV0MFS+KD/WJyNcrHR7sK5EFpz1PMYIBjzCCAYsCAQEwZDBfMREwDwYDVQQDDAhTdG9yZUtpdDERMA8GA1UECgwIU3RvcmVLaXQxETAPBgNVBAsMCFN0b3JlS2l0MQswCQYDVQQGEwJVUzEXMBUGCSqGSIb3DQEJARYIU3RvcmVLaXQCAQEwDQYJYIZIAWUDBAIBBQAwDQYJKoZIhvcNAQELBQAEggEAEGJ8YhCMNn+P5x3HmUU0gTScTBVSfE9PROFLZe0otbxoDrbEPkJOPhv7JCY5dK5bQS5UE559oh0pC8PdbdfgneEURvIVF6BJw7gBhTo4svkvd4iKjC7Iu/BpEpLtausLomKHtMZZzf39F8O2tHugWyt9MMg4R7Xnqq3YbtrAwOY2wE9AEo+QPY2m1eqgOFBHPgAqVJ+ma4eZaC6xxPeuYOSES6PbLgtTL3BxsP31ca2ahbmIORvy5d27dcDkqp1j125O701/2mT1YnBhQJwI9P1DD9GpTv01eZyA6yzasyKixc+cMy/Lhf5BZS4fwFSMkrTn+d9XYnf50/X0SRwhggAAAAAAAA==',
    transactionId: '0',
  },
  year: {
    transactionId: '0',
    transactionDate: 1721021481108,
    productId: 'com.cartoon.photo.editor.toonmeapp.yearly',
    transactionReceipt:
      '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',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
