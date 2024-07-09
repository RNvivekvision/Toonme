import { StyleSheet, TouchableOpacity } from 'react-native';
import { RNImage, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, { FadeInDown } from 'react-native-reanimated';

const RenderImageOptions = ({ item, index, selected, onPress }) => {
  const styles = useStyles({ selected });
  const img = `data:image/png;base64,${item?.category_logo}`;

  return (
    <Reanimated.View
      entering={FadeInDown.delay(100 * index)}
      style={styles.container}>
      <TouchableOpacity onPress={() => onPress?.(index)} style={styles.button}>
        <RNImage
          source={{ uri: img }}
          resizeMode={'cover'}
          style={styles.img}
        />
        <RNText style={styles.title}>{item?.category_name}</RNText>
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
    title: {
      fontSize: FontSize.font10,
      fontFamily: FontFamily.SemiBold,
    },
  });
};

export default RenderImageOptions;
