import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles } from '../../Common';
import { wp } from '../../Theme';
import { useState } from 'react';
import { Functions } from '../../Utils';

const size = { img: wp(90) };
const Three = ({ images }) => {
  const [State, setState] = useState({ images: images });
  const [first, second, third] = State.images;
  // console.log('State -> ', JSON.stringify(State, null, 2));

  const onItemPress = async index => {
    try {
      const images = await Functions.updateImage(index, State);
      console.log(JSON.stringify(images, null, 2));
      setState(p => ({ ...p, images: images }));
    } catch (e) {
      console.log('Error onItemPress -> ', e);
    }
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
