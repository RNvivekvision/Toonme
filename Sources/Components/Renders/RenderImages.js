import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNImageLoader, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter, togglePremium } from '../../Redux/Actions';
import { Strings } from '../../Constants';

const RenderImages = ({ images, onFilterPress }) => {
  const { subscriptionPurchase } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();

  const onItemPress = v => {
    if (v?.is_pro === 'true' && !subscriptionPurchase) {
      dispatch(setSelectedFilter(v?.combo_id));
      dispatch(togglePremium());
      return;
    }
    onFilterPress?.(v);
  };

  const List = useCallback(() => {
    return (
      <View style={styles.container}>
        {images.map((v, i) => (
          <Render key={i} item={v} index={i} onItemPress={onItemPress} />
        ))}
      </View>
    );
  }, [images]);

  if (!images?.length > 0) return;
  return <List />;
};

const Render = ({ item, index, onItemPress }) => {
  const { subscriptionPurchase } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const [State, setState] = useState({ isLoading: false });
  const isPro = item?.is_pro === 'true' && !subscriptionPurchase;
  const isVideo = item?.file_type === 'video';

  return (
    <Reanimated.View
      entering={FadeInDown.delay(index * 150)}
      style={styles.content}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => onItemPress(item)}>
        {isPro && (
          <View style={styles.proContainer}>
            <RNText style={styles.proText}>{Strings.Pro}</RNText>
          </View>
        )}
        {true && <RNImageLoader visible={State.isLoading} />}
        {isVideo ? (
          <Video
            source={{ uri: item?.data }}
            repeat={true}
            style={styles.img}
            resizeMode={'cover'}
            onLoadStart={() => setState(p => ({ ...p, isLoading: true }))}
            onBuffer={() => setState(p => ({ ...p, isLoading: false }))}
            onError={() => setState(p => ({ ...p, isLoading: false }))}
          />
        ) : (
          <RNImage
            source={{ uri: item?.data }}
            resizeMode={'cover'}
            style={styles.img}
            onLoadStart={() => setState(p => ({ ...p, isLoading: true }))}
            onLoadEnd={() => setState(p => ({ ...p, isLoading: false }))}
          />
        )}
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexWrapHorizontal,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(16),
  },
  content: {
    width: wp(45),
    height: hp(30),
  },
  img: {
    width: '96%',
    height: '96%',
    borderRadius: wp(3),
    marginLeft: wp(1),
    marginTop: wp(1),
    overflow: 'hidden',
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

export default RenderImages;
