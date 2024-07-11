import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles } from '../../Common';
import { wp } from '../../Theme';
import { useState } from 'react';
import { Functions } from '../../Utils';

const Five = ({ images }) => {
  const [State, setState] = useState({ images: images });
  const lastImage = State.images[State.images.length - 1];

  const onItemPress = async index => {
    const images = await Functions.updateImage(index, State);
    setState(p => ({ ...p, images: images }));
  };

  return (
    <View style={styles.container}>
      {State.images.map((v, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.6}
          style={styles.images}
          onPress={() => onItemPress(i)}>
          <RNImage
            key={i}
            source={{ uri: v.path }}
            resizeMode={'cover'}
            style={RNStyles.image100}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onItemPress(State.images.length - 1)}
        style={styles.lastImage}>
        <RNImage
          source={{ uri: lastImage.path }}
          resizeMode={'cover'}
          style={RNStyles.image100}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexWrapHorizontal,
    ...RNStyles.center,
  },
  images: {
    width: wp(44.9),
    height: wp(44.9),
  },
  lastImage: {
    position: 'absolute',
    width: wp(35),
    height: wp(35),
    top: wp(25),
    borderRadius: wp(3),
  },
});

export default Five;
