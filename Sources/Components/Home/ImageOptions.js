import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { RenderImageOptions, RenderImages } from '../Renders';
import { useUserClick } from '../../Hooks';
import { wp } from '../../Theme';

const ImageOptions = ({ onFilterPress }) => {
  const { filters } = useSelector(({ UserReducer }) => UserReducer);
  const [State, setState] = useState({ selected: 0 });
  const { incrementCount } = useUserClick();

  const onItemPress = async v => {
    await incrementCount();
    setState(p => ({ ...p, selected: v }));
  };

  return (
    <>
      <FlatList
        data={filters}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RenderImageOptions
            item={item}
            index={index}
            selected={State.selected === index}
            onPress={onItemPress}
          />
        )}
      />
      <RenderImages
        images={filters[State.selected]?.data}
        onFilterPress={onFilterPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: wp(4),
    marginVertical: wp(2),
  },
});

export default ImageOptions;
