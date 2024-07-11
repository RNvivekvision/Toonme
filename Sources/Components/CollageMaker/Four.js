import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles } from '../../Common';
import { wp } from '../../Theme';
import { Functions } from '../../Utils';
import { useState } from 'react';

const Four = ({ images }) => {
  const [State, setState] = useState({ images: images });

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
});

export default Four;
