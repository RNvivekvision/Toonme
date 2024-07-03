import { StyleSheet, View } from 'react-native';
import { RNImage, RNText } from '../../Common';
import { Images } from '../../Constants';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';

const RenderSteps = ({ item, index }) => {
  return (
    <View style={styles.container}>
      <RNText style={styles.title}>{item.title}</RNText>
      <View style={styles.devider} />
      <RNText style={styles.text}>{item.text}</RNText>
      <RNImage source={Images['step_' + index]} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
  },
  img: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.font20,
    fontFamily: FontFamily.SemiBold,
    paddingTop: hp(2),
  },
  text: {
    textAlign: 'center',
    fontSize: FontSize.font14,
    paddingHorizontal: wp(8),
    paddingBottom: hp(2),
  },
  devider: {
    width: '15%',
    height: wp(1),
    backgroundColor: Colors.Primary,
    alignSelf: 'center',
    borderRadius: 100,
    marginVertical: hp(1),
  },
});

export default RenderSteps;
