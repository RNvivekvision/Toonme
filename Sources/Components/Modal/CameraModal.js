import { Modal, StyleSheet, View } from 'react-native';
import { RNContainer, RNIcon, RNStyles } from '../../Common';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useEffect, useRef, useState } from 'react';
import { useInset } from '../../Hooks';
import { Colors, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { useDispatch } from 'react-redux';
import { toggleCamera } from '../../Redux/Actions';

const CameraModal = ({ visible, onClose }) => {
  const [State, setState] = useState({ position: 'back', flash: 'off' });
  const { requestPermission } = useCameraPermission();
  const device = useCameraDevice(State.position);
  const styles = useStyles();
  const cameraRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermission();
  }, []);

  const onBackPress = () => {
    dispatch(toggleCamera());
  };

  const onFlashPress = () => {
    setState(p => ({ ...p, flash: p.flash === 'off' ? 'on' : 'off' }));
  };

  const onCameraPress = async () => {
    const photo = await cameraRef.current.takePhoto();
    console.log('photo -> ', JSON.stringify({ photo }, null, 2));
  };

  const onChangeCameraPress = () => {
    setState(p => ({
      ...p,
      position: p.position === 'back' ? 'front' : 'back',
    }));
  };

  return (
    <Modal visible={visible} animationType={'slide'} onRequestClose={onClose}>
      <RNContainer>
        {device && (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            torch={State.flash}
          />
        )}
        <RNIcon
          containerStyle={[styles.buttonContainer, styles.back]}
          icon={Images.cross}
          iconStyle={RNStyles.image50}
          onPress={onBackPress}
        />

        <View style={styles.bottomOverlay}>
          <RNIcon
            containerStyle={styles.buttonContainer}
            icon={Images.flashlight}
            iconStyle={RNStyles.image50}
            onPress={onFlashPress}
          />
          <RNIcon
            containerStyle={styles.buttonContainer}
            icon={Images.camera}
            iconStyle={RNStyles.image50}
            onPress={onCameraPress}
          />
          <RNIcon
            containerStyle={styles.buttonContainer}
            icon={Images.changeCamera}
            iconStyle={RNStyles.image50}
            onPress={onChangeCameraPress}
          />
        </View>
      </RNContainer>
    </Modal>
  );
};

const size = {
  buttonContainer: wp(15),
  back: wp(8),
};
const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    bottomOverlay: {
      ...RNStyles.flexRowBetween,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: hp(2),
      paddingBottom: inset.bottom + hp(6),
      paddingHorizontal: wp(8),
    },
    buttonContainer: {
      ...RNStyles.center,
      backgroundColor: Colors.White,
      width: size.buttonContainer,
      height: size.buttonContainer,
      borderRadius: wp(3),
    },
    back: {
      width: size.back,
      height: size.back,
      position: 'absolute',
      top: inset.top + wp(4),
      right: wp(4),
    },
  });
};

export default CameraModal;
