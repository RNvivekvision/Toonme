import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles } from '../../Common';
import { hp, wp } from '../../Theme';
import { MasonryFlashList } from '@shopify/flash-list';
import Reanimated, { FadeInDown } from 'react-native-reanimated';

const RenderImages = ({ images, onPress, columnCount }) => {
  const styles = useStyles();

  const List = useCallback(() => {
    if (!images?.length > 0) return;
    return images.map((v, i) => {
      const height = ((i * 10) % 100) + hp(40) / ((i % 2) + 1);
      const img = `data:image/png;base64,${v?.data}`;

      return (
        <Reanimated.View
          entering={FadeInDown.delay(i * 150)}
          style={[styles.content, { height: hp(30) || height }]}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onPress?.(v)}>
            <RNImage
              source={{ uri: img }}
              resizeMode={'cover'}
              style={styles.img}
            />
          </TouchableOpacity>
        </Reanimated.View>
      );
    });

    return (
      <MasonryFlashList
        testID="MasonryList"
        data={images}
        optimizeItemArrangement
        overrideItemLayout={(layout, item) => {
          layout.size = item.height;
        }}
        numColumns={columnCount || 2}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={150}
        renderItem={({ item, index }) => {
          const height = ((index * 10) % 100) + hp(40) / ((index % 2) + 1);
          const img = `data:image/png;base64,${item?.data}`;
          return (
            <Reanimated.View
              entering={FadeInDown.delay(index * 150)}
              style={[styles.content, { height: hp(30) || height }]}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onPress?.(item)}>
                <RNImage
                  source={{ uri: img }}
                  resizeMode={'cover'}
                  style={styles.img}
                />
              </TouchableOpacity>
            </Reanimated.View>
          );
        }}
      />
    );
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
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
      ...RNStyles.flexWrapHorizontal,
    },
    content: {
      width: wp(45),
    },
    img: {
      width: '94%',
      height: '94%',
      // width: '48%',
      // height: '95%',
      borderRadius: wp(3),
      marginLeft: wp(2),
      marginTop: wp(2),
    },
  });
};

export default RenderImages;
