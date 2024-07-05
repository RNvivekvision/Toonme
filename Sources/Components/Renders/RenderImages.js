import { StyleSheet, View } from 'react-native';
import { RNImage } from '../../Common';
import { hp, wp } from '../../Theme';
import { MasonryFlashList } from '@shopify/flash-list';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import { Images } from '../../Constants';

const RenderImages = ({ images, columnCount }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        testID="MasonryList"
        data={images}
        optimizeItemArrangement
        overrideItemLayout={(layout, item) => {
          layout.size = item.height;
        }}
        numColumns={columnCount || 2}
        estimatedItemSize={150}
        renderItem={({ item, index }) => {
          return (
            <Reanimated.View
              entering={FadeInDown.delay(index * 150)}
              style={[styles.content, { height: item.height }]}>
              <RNImage
                source={Images.dummy}
                resizeMode={'cover'}
                style={styles.img}
              />
            </Reanimated.View>
          );
        }}
      />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
    },
    content: {
      width: wp(90),
    },
    img: {
      width: '48%',
      height: '95%',
      borderRadius: wp(3),
      marginLeft: wp(2),
    },
  });
};

export default RenderImages;
