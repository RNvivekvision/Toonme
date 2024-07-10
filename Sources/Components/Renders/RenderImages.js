import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { setSelectedFilter, togglePremium } from '../../Redux/Actions';

const RenderImages = ({ images, onFilterPress }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const onItemPress = v => {
    if (v?.is_pro === 'true') {
      dispatch(setSelectedFilter(v?.combo_id));
      dispatch(togglePremium());
      return;
    }
    onFilterPress?.(v);
  };

  function isValidBase64(base64) {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(base64);
  }
  function decodeBase64(base64) {
    try {
      const decodedString = atob(base64);
      return { success: true, decodedString };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  function verifyBase64Video(base64) {
    if (!isValidBase64(base64)) {
      return { success: false, error: 'Invalid base64 string' };
    }

    const decodedResult = decodeBase64(base64);
    if (!decodedResult.success) {
      return decodedResult;
    }

    // Create a Blob and check if it's a valid video
    const byteCharacters = decodedResult.decodedString;
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'video/mp4' });
    return blob;
  }

  const List = useCallback(() => {
    if (!images?.length > 0) return;

    return images.map((v, i) => {
      const height = ((i * 10) % 100) + hp(40) / ((i % 2) + 1);
      const img = `data:image/png;base64,${v?.data}`;
      const vid = `data:video/mp4;base64,${v?.data}`;
      const isPro = v?.is_pro === 'true';
      const isVideo = v?.file_type === 'video';

      return (
        <Reanimated.View
          key={i}
          entering={FadeInDown.delay(i * 150)}
          style={styles.content}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onItemPress(v)}>
            {isPro && (
              <View style={styles.proContainer}>
                <RNText style={styles.proText}>{'Pro'}</RNText>
              </View>
            )}
            {isVideo ? (
              <Video
                source={{ uri: vid }}
                onBuffer={b => {
                  console.log('Video Buffer -> ', b);
                }}
                onError={e => {
                  console.error('Video Error -> ', e);
                }}
                repeat={true}
                style={styles.img}
                resizeMode={'cover'}
              />
            ) : (
              <RNImage
                source={{ uri: img }}
                resizeMode={'cover'}
                style={styles.img}
              />
            )}
          </TouchableOpacity>
        </Reanimated.View>
      );
    });
  }, [images]);

  return (
    <View style={styles.container}>
      <List />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      ...RNStyles.flexWrapHorizontal,
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
      // paddingBottom: hp(18),
    },
    content: {
      width: wp(45),
      height: hp(30),
      // borderWidth: 1,
    },
    img: {
      width: '96%',
      height: '96%',
      borderRadius: wp(3),
      marginLeft: wp(1),
      marginTop: wp(1),
    },
    proContainer: {
      position: 'absolute',
      zIndex: 1,
      top: wp(4),
      right: wp(4),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      borderRadius: wp(4),
      backgroundColor: Colors.Primary,
    },
    proText: {
      fontSize: FontSize.font12,
      fontFamily: FontFamily.SemiBold,
    },
  });
};

export default RenderImages;
