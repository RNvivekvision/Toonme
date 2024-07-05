import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

const RenderImageOptions = ({ item, selected }) => {
  const styles = useStyles({ selected });

  return (
    <Reanimated.View
      entering={FadeInDown.delay(100 * item.id)}
      style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <RNImage source={item.img} style={styles.img} />
        <RNText size={FontSize.font10} family={FontFamily.SemiBold}>
          {item.title}
        </RNText>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const size = { img: wp(10) };
const useStyles = ({ selected }) => {
  return StyleSheet.create({
    container: {
      borderRadius: 100,
      marginHorizontal: wp(1.6),
      backgroundColor: selected ? Colors.Primary : Colors.Black + '10',
    },
    button: {
      width: wp(15),
      height: wp(20),
      borderRadius: 100,
      alignItems: 'center',
    },
    img: {
      width: size.img,
      height: size.img,
      borderRadius: 100,
      marginVertical: hp(1),
    },
  });
};

export default RenderImageOptions;
