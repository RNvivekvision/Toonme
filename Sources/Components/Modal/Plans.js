import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNButton, RNIcon, RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { useInset } from '../../Hooks';
import { DummyData } from '../../Utils';
import { RenderPlans } from '../Renders';
import { useState } from 'react';

const Plans = ({ visible, onClose }) => {
  const [State, setState] = useState({ selectedPlan: DummyData.plans[0] });
  const styles = useStyles();
  const inset = useInset();

  return (
    <Modal visible={visible} animationType={'slide'} onRequestClose={onClose}>
      <View style={styles.container}>
        <RNIcon
          icon={Images.cross}
          containerStyle={styles.iconContainer}
          iconStyle={styles.icon}
          onPress={onClose}
        />
        <View style={styles.imgContainer}>
          <RNImage
            source={Images.onboardingBackground}
            style={RNStyles.image100}
          />
          <RNImage source={Images.onboarding_0} style={styles.onboarding_0} />
        </View>

        <View style={styles.content}>
          <RNText size={FontSize.font20} family={FontFamily.SemiBold}>
            {'Upgrade Now !!!'}
          </RNText>
          <RNText size={FontSize.font14} pBottom={hp(1)} pRight={wp(6)}>
            {"You'll need a premium membership to connect"}
          </RNText>

          <View style={styles.trueContainer}>
            <RNImage source={Images.trueYellow} style={RNStyles.icon} />
            <RNText style={styles.trueText}>{'Remove All Ads'}</RNText>
          </View>
          <View style={styles.trueContainer}>
            <RNImage source={Images.trueYellow} style={RNStyles.icon} />
            <RNText style={styles.trueText}>{'Unlimited Download'}</RNText>
          </View>

          {DummyData.plans.map((v, i) => (
            <RenderPlans
              key={i}
              item={v}
              onPress={v => setState(p => ({ ...p, selectedPlan: v }))}
              selected={State.selectedPlan?.id == v.id}
            />
          ))}
        </View>
      </View>
      <RNButton title={'Subscribe'} onPress={onClose} />
      <RNText
        align={'center'}
        size={FontSize.font12}
        pBottom={inset.bottom + hp(2)}
        family={FontFamily.Medium}>
        {'No commitments, Cancel Anytime'}
      </RNText>
    </Modal>
  );
};

const size = { close: wp(8), img: wp(40) };
const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    container: {
      ...RNStyles.container,
    },
    iconContainer: {
      width: size.close,
      height: size.close,
      borderRadius: 100,
      position: 'absolute',
      top: inset.top + wp(2),
      right: wp(4),
      backgroundColor: Colors.Black + '15',
    },
    icon: {
      width: size.close * 0.4,
      height: size.close * 0.4,
    },
    imgContainer: {
      width: wp(80),
      height: wp(60),
      alignSelf: 'center',
      marginTop: inset.top,
    },
    onboarding_0: {
      width: size.img,
      height: size.img * 1.5,
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
    },
    content: {
      paddingHorizontal: wp(4),
    },
    trueContainer: {
      ...RNStyles.flexRow,
      paddingVertical: hp(1),
    },
    trueText: {
      fontSize: FontSize.font14,
      paddingHorizontal: wp(3),
    },
  });
};

export default Plans;
