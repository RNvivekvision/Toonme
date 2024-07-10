import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { FontFamily, FontSize, hp, wp } from '../../Theme';
import { Strings } from '../../Constants';
import Reanimated, { FadeInDown } from 'react-native-reanimated';

const img = [
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_1.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=n%2FSu0324p3FRZ6tEukycG7zuVbI%3D&Expires=1720686976',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_2.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=gRYzatmGmNPYJ1dEuzDiLtDbGq0%3D&Expires=1720686977',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_3.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=AUTxYhpLzCVS48f3AcKDOJxwckw%3D&Expires=1720686978',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_4.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=ogyjf7AiohYA9cw7%2FpRrqTGV25c%3D&Expires=1720686978',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_5.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=DYDVLATnL4sHsxEz4vRbfIdzCqw%3D&Expires=1720686979',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_6.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=ao9CgT4WMIbea0r91gIxPrSOppw%3D&Expires=1720686980',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_7.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=5wAGKufJjsS2g1g4xFs38ZDB8kc%3D&Expires=1720686981',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_8.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=njysT6DwTmuGiJ2Bd3%2FZDeORSF0%3D&Expires=1720686982',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_9.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=w1j%2Fb%2BRIZV18Du7Nht8P16iNreo%3D&Expires=1720686984',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_10.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=oznc07rpMjLaK%2FREoNWrZIr4mSA%3D&Expires=1720686985',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_11.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=c%2F5lbMcC56QN8RAizN8BVOJH7nM%3D&Expires=1720686986',
  'https://cartoonphoto-ai-editor.s3.amazonaws.com/oNnkKblA_12.jpg?AWSAccessKeyId=AKIA3DTGE6WCS2UCEEWU&Signature=sIGs38vR9uW0T%2BdfUsgs0JLHELU%3D&Expires=1720686987',
];
const Cartoons = ({ images, onPress }) => {
  if (!images.length > 0) return null;

  return (
    <View style={styles.container}>
      <RNText
        size={FontSize.font18}
        family={FontFamily.SemiBold}
        pVertical={hp(1)}>
        {Strings.HotCartoons}
      </RNText>

      <View style={RNStyles.flexWrapHorizontal}>
        {images.map((v, i) => (
          <Reanimated.View entering={FadeInDown.delay(i * 150)}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPress?.(v)}>
              <RNImage source={{ uri: v }} resizeMode={'cover'} />
            </TouchableOpacity>
          </Reanimated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
  },
  button: {
    width: wp(43),
    height: hp(30),
    marginHorizontal: wp(1),
    marginVertical: hp(0.5),
    borderRadius: wp(3),
    overflow: 'hidden',
  },
});

export default Cartoons;
