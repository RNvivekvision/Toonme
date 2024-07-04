import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNButton, RNStyles, RNText } from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';

const TryForFree = () => {
  return (
    <View style={styles.container}>
      <View style={styles.free}>
        <View style={styles.circle} />
        <RNText family={FontFamily.SemiBold} size={FontSize.font10}>
          {'Free'}
        </RNText>
        <View style={[styles.circle, styles.rightCircle]} />
      </View>
      <RNText
        style={{ flex: 1 }}
        size={FontSize.font13}
        pHorizontal={wp(2)}
        family={FontFamily.SemiBold}
        color={Colors.White}>
        {'Try the FREE full\nPRO version'}
      </RNText>
      <RNButton
        title={'Try for free'}
        doubleTicks={false}
        style={styles.tryButton}
        textStyle={{ fontSize: FontSize.font10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRowBetween,
    borderWidth: 1,
    paddingVertical: hp(1),
    marginHorizontal: wp(4),
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    backgroundColor: Colors.card,
  },
  tryButton: {
    width: '30%',
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
  },
  free: {
    borderWidth: 1,
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
