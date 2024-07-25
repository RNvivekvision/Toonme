import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import {
  RNButton,
  RNIcon,
  RNImage,
  RNLoader,
  RNStyles,
  RNText,
} from '../../Common';
import { Images, Strings } from '../../Constants';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { useInset } from '../../Hooks';
import { DummyData, Functions } from '../../Utils';
import { RenderPlans } from '../Renders';
// import * as IAP from 'react-native-iap';
import { useDispatch } from 'react-redux';
import { setSubscriptionPurchase } from '../../Redux/Actions';
import { getFilters } from '../../Redux/ExtraReducers';
// import { setSubscriptionPurchase } from '../../Redux/Actions';

const { skus, AppSpecificSharedSecret } = DummyData;

const Plans = ({ visible, onClose }) => {
  const [State, setState] = useState({
    selectedPlan: DummyData.plans[0],
    isLoading: false,
  });
  const styles = useStyles();
  const inset = useInset();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   initIAP();
  // }, []);

  const initIAP = async () => {
    try {
      await IAP.clearTransactionIOS();
      const connect = await IAP.initConnection();
      if (!connect) return;
      const subscriptions = await IAP.getSubscriptions({ skus: skus });
      // console.log('Subscriptions -> ', JSON.stringify(subscriptions, null, 2));
    } catch (e) {
      console.error('Error getSubscriptions -> ', e);
    }
  };

  const onRequestPurchase = async () => {
    setState(p => ({ ...p, isLoading: true }));

    try {
      const purchase = await IAP.requestPurchase({
        sku: State.selectedPlan.sku,
      });
      console.log('Purchase -> ', JSON.stringify(purchase, null, 2));
      // const oneMonthLaterTimestamp = new Date(
      //   new Date().setMonth(new Date().getMonth() + 1),
      // ).getTime();
      // await Functions.setSubscription({
      //   ...purchase,
      //   expiry: oneMonthLaterTimestamp,
      // });
      dispatch(setSubscriptionPurchase(true));
      dispatch(getFilters());
      onClose?.();
    } catch (e) {
      alert(e);
      console.error('Error In App Purchase -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onValidateReceipt = async () => {
    try {
      const latestPurchase = await IAP.getReceiptIOS({});
      const receiptBody = {
        'receipt-data': latestPurchase,
        password: AppSpecificSharedSecret,
      };
      const decodedReceipt = await IAP.validateReceiptIos({
        receiptBody,
        isTest: Functions.isDev,
      });
      console.log(
        'Validate -> ',
        JSON.stringify(
          {
            latestPurchase,
            decodedReceipt,
          },
          null,
          2,
        ),
      );
    } catch (e) {
      alert(e);
      console.error('Error Validating Receipt -> ', e);
    }
  };

  return (
    <Modal visible={visible} animationType={'slide'} onRequestClose={onClose}>
      <RNLoader visible={State.isLoading} />

      <ScrollView>
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
              {Strings.UpgradeNow}
            </RNText>
            <RNText size={FontSize.font14} pBottom={hp(1)} pRight={wp(6)}>
              {Strings.UpgradeNowDesc}
            </RNText>

            <View style={styles.trueContainer}>
              <RNImage source={Images.trueYellow} style={RNStyles.icon} />
              <RNText style={styles.trueText}>{Strings.RemoveAllAds}</RNText>
            </View>
            <View style={styles.trueContainer}>
              <RNImage source={Images.trueYellow} style={RNStyles.icon} />
              <RNText style={styles.trueText}>
                {Strings.UnlimitedDownload}
              </RNText>
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
      </ScrollView>

      <RNButton title={Strings.Subscribe} />
      {/* <RNButton title={Strings.Subscribe} onPress={onRequestPurchase} /> */}
      {/* <RNButton title={'Validate'} onPress={onValidateReceipt} /> */}

      <RNText
        align={'center'}
        size={FontSize.font12}
        pBottom={inset.bottom + hp(2)}
        family={FontFamily.Medium}>
        {Strings.SubscribeDesc}
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
      paddingBottom: hp(2),
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
