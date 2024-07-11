import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles } from '../../Common';
import { wp } from '../../Theme';
import { useState } from 'react';
import { Functions } from '../../Utils';

const size = { img: wp(90) };
const Two = ({ images }) => {
  const [State, setState] = useState({ images: images });

  const onItemPress = async index => {
    const images = await Functions.updateImage(index, State);
    setState(p => ({ ...p, images: images }));
  };

  return (
    <View style={styles.container}>
      {State.images.map((v, i) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onItemPress(i)}
          key={i}
          style={styles.img}>
          <RNImage
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
    ...RNStyles.flexRow,
    justifyContent: 'space-between',
  },
  img: {
    width: '50%',
    height: size.img,
  },
});

export default Two;
