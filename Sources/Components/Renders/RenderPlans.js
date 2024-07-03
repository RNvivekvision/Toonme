import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';

const RenderPlans = ({ item, onPress, selected }) => {
  const styles = useStyles(selected);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress?.(item)}
      style={styles.renderContainer}>
      {selected && <RNImage source={Images.planSelected} style={styles.icon} />}
      <RNText style={styles.renderTitle}>{item.title}</RNText>
      <RNText style={styles.renderPrice}>{item.price}</RNText>
    </TouchableOpacity>
  );
};

const useStyles = selected => {
  return StyleSheet.create({
    renderContainer: {
      ...RNStyles.flexRowBetween,
      borderWidth: 1,
      borderColor: selected ? Colors.Primary : Colors.White,
      backgroundColor: !selected ? Colors.Primary + '20' : Colors.White,
      paddingVertical: hp(3),
      paddingHorizontal: wp(5),
      borderRadius: wp(4),
      marginTop: hp(2),
    },
    renderTitle: {
      fontSize: FontSize.font14,
      fontFamily: FontFamily.Medium,
    },
    renderPrice: {
      fontSize: FontSize.font10,
      fontFamily: FontFamily.Medium,
    },
    icon: {
      width: wp(8),
      height: wp(8),
      position: 'absolute',
      top: 0,
    },
  });
};

export default RenderPlans;
