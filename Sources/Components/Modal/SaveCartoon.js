import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNButton, RNImage, RNStyles } from '../../Common';
import { Colors, hp, wp } from '../../Theme';
import { Functions } from '../../Utils';
import { Strings } from '../../Constants';
import { useUserClick } from '../../Hooks';

const SaveCartoon = ({ visible, cartoon, onClose, onSave }) => {
  const { incrementCount } = useUserClick();

  const onClosing = () => onClose?.();

  const onSavePress = async () => {
    try {
      const downloadCount = await Functions.updateDownloadCount();
      await incrementCount(downloadCount > 10);
      await Functions.saveToCameraRoll(cartoon);
      onClosing();
      onSave?.();
    } catch (e) {
      console.error('Error onSavePress -> ', e);
    }
  };

  return (
    <Modal
      visible={visible || false}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onClosing}>
      <TouchableWithoutFeedback onPress={onClosing}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <RNImage
              source={{ uri: cartoon }}
              resizeMode={'cover'}
              style={styles.img}
            />
            <RNButton
              title={Strings.Save}
              doubleTicks={false}
              onPress={onSavePress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const size = { img: wp(75) };
const styles = StyleSheet.create({
  overlay: {
    ...RNStyles.center,
    ...RNStyles.container,
    backgroundColor: Colors.Black + '40',
  },
  content: {
    backgroundColor: Colors.White,
    width: wp(90),
    borderRadius: wp(4),
    paddingVertical: hp(2),
  },
  img: {
    width: size.img,
    height: size.img,
    borderRadius: wp(3),
    alignSelf: 'center',
    marginVertical: hp(2),
  },
});

export default SaveCartoon;
