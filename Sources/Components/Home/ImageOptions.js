import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RenderImageOptions, RenderImages } from '../Renders';
import { hp, wp } from '../../Theme';
import { DummyData } from '../../Utils';

const { Home } = DummyData;

const ImageOptions = () => {
  const [State, setState] = useState({ selected: Home.ImageOptions[0] });
  const columnCount = 2;
  const images = new Array(50).fill(null).map((_, index) => {
    return {
      index,
      height: ((index * 10) % 100) + hp(25) / ((index % columnCount) + 1),
    };
  });

  return (
    <View>
      <FlatList
        data={Home.ImageOptions}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        renderItem={({ item }) => (
          <RenderImageOptions
            item={item}
            selected={State.selected?.id === item.id}
          />
        )}
      />

      <RenderImages images={images} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: wp(4),
    marginVertical: wp(2),
  },
});

export default ImageOptions;
