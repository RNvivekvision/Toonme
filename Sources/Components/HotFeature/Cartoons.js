import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { FontFamily, FontSize, hp, wp } from '../../Theme';
import { Strings } from '../../Constants';
import Reanimated, { FadeInDown } from 'react-native-reanimated';

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
