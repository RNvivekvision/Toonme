import { StyleSheet, View } from 'react-native';
import { RNButton, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { togglePlans } from '../../Redux/Actions';
import { Strings } from '../../Constants';

const TryForFree = () => {
  const dispatch = useDispatch();
  return (
    <Reanimated.View entering={FadeInDown.delay(100)} style={styles.container}>
      <View style={styles.free}>
        <View style={styles.circle} />
        <RNText family={FontFamily.SemiBold} size={FontSize.font10}>
          {Strings.Free}
        </RNText>
        <View style={[styles.circle, styles.rightCircle]} />
      </View>
      <RNText
        style={{ flex: 1 }}
        size={FontSize.font13}
        pHorizontal={wp(2)}
        family={FontFamily.SemiBold}
        color={Colors.White}>
        {Strings.freeDesc}
      </RNText>
      <RNButton
        title={Strings.Tryforfree}
        doubleTicks={false}
        style={styles.tryButton}
        textStyle={{ fontSize: FontSize.font10 }}
        onPress={() => dispatch(togglePlans())}
      />
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRowBetween,
    paddingVertical: hp(1),
    marginHorizontal: wp(4),
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    backgroundColor: Colors.card,
    marginVertical: hp(1),
  },
  tryButton: {
    width: '30%',
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
  },
  free: {
    backgroundColor: Colors.free,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(4),
    transform: [{ rotate: '-20deg' }],
  },
  circle: {
    ...RNStyles.icon,
    backgroundColor: Colors.card,
    borderRadius: 100,
    position: 'absolute',
    top: hp(0.5),
    left: -wp(3),
  },
  rightCircle: {
    right: -wp(3),
    left: null,
  },
});

export default TryForFree;
