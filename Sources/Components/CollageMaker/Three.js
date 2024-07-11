import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles } from '../../Common';
import { wp } from '../../Theme';
import { useState } from 'react';
import { Functions } from '../../Utils';

const size = { img: wp(90) };
const Three = ({ images }) => {
  const [State, setState] = useState({ images: images });
  const [first, second, third] = State.images;

  const onItemPress = async index => {
    const images = await Functions.updateImage(index, State);
    setState(p => ({ ...p, images: images }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.first}
        activeOpacity={0.6}
        onPress={() => onItemPress(0)}>
        <RNImage
          source={{ uri: first.path }}
          resizeMode={'cover'}
          style={RNStyles.image100}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onItemPress(1)}
          style={RNStyles.image50}>
          <RNImage
            source={{ uri: second.path }}
            resizeMode={'cover'}
            style={RNStyles.image100}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onItemPress(2)}
          style={RNStyles.image50}>
          <RNImage
            source={{ uri: third.path }}
            resizeMode={'cover'}
            style={RNStyles.image100}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRow,
    justifyContent: 'space-between',
  },
  first: {
    width: '50%',
    height: size.img,
  },
  content: {
    ...RNStyles.image100,
    justifyContent: 'space-between',
  },
});

export default Three;
