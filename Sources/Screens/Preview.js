import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RNButton, RNContainer, RNHeader, RNImage, RNStyles } from '../Common';
import { Colors, hp, wp } from '../Theme';
import { NativeAd } from '../Components';
import { NavRoutes } from '../Navigation';
import { Strings } from '../Constants';

const Preview = ({ navigation }) => {
  const { clickedImage } = useSelector(({ UserReducer }) => UserReducer);

  const onCartoonPress = () => {
    navigation.navigate(NavRoutes.SelectCartoon);
  };

  return (
    <RNContainer>
      <RNHeader title={Strings.Preview} back>
        <View style={styles.imgContainer}>
          <RNImage source={{ uri: clickedImage.path }} />
        </View>

        <View style={styles.buttonContainer}>
          <RNButton
            title={Strings.Edit}
            style={styles.button}
            doubleTicks={false}
          />
          <RNButton
            title={Strings.Cartoon}
            style={styles.button}
            doubleTicks={false}
            onPress={onCartoonPress}
          />
        </View>
      </RNHeader>
      <NativeAd />
    </RNContainer>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    borderRadius: wp(3),
    overflow: 'hidden',
    width: wp(90),
    height: wp(90),
    alignSelf: 'center',
  },
  buttonContainer: {
    ...RNStyles.flexRowBetween,
    marginHorizontal: wp(6),
    paddingVertical: hp(2),
  },
  button: {
    width: wp(40),
    marginHorizontal: 0,
  },
});

export default Preview;
