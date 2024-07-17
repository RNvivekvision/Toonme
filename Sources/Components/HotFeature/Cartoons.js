import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Strings } from '../../Constants';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import { togglePremium } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';

const Cartoons = ({ images, onPress }) => {
  const { subscriptionPurchase } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();

  const onItemPress = (item, index) => {
    if (index !== 0 && !subscriptionPurchase) {
      dispatch(togglePremium());
      onPress?.(item, false);
      return;
    }

    onPress?.(item);
  };

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
          <Reanimated.View key={i} entering={FadeInDown.delay(i * 150)}>
            {i !== 0 && !subscriptionPurchase && (
              <View style={styles.proContainer}>
                <RNText style={styles.proText}>{Strings.Pro}</RNText>
              </View>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => onItemPress(v, i)}>
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
  proContainer: {
    position: 'absolute',
    zIndex: 1,
    top: wp(4),
    right: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(4),
    backgroundColor: Colors.Primary,
  },
  proText: {
    fontSize: FontSize.font12,
    fontFamily: FontFamily.SemiBold,
  },
});

export default Cartoons;
