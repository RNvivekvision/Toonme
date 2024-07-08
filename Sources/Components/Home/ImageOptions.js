import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RenderImageOptions, RenderImages } from '../Renders';
import { wp } from '../../Theme';
import { URL } from '../../Services';
import { useDispatch } from 'react-redux';
import { showAdLoader } from '../../Redux/Reducers/UserReducer';

const ImageOptions = () => {
  const dispatch = useDispatch();
  const [State, setState] = useState({
    categories: [],
    selected: 0,
  });

  useEffect(() => {
    getAllFilters();
  }, []);

  const getAllFilters = async () => {
    dispatch(showAdLoader(true));
    try {
      const responseJson = await fetch(URL.filters);
      const response = await responseJson.json();
      const categories = response?.categories?.sort((a, b) => {
        if (a.category_name < b.category_name) return -1;
        if (a.category_name > b.category_name) return 1;
        return 0;
      });
      setState(p => ({ ...p, categories: categories, selected: 0 }));
      // console.log('response -> ', JSON.stringify(categories, null, 2));
    } catch (e) {
      console.error('Error getAllFilters -> ', e);
    } finally {
      dispatch(showAdLoader(false));
    }
  };

  return (
    <>
      <FlatList
        data={State.categories}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RenderImageOptions
            item={item}
            index={index}
            selected={State.selected === index}
            onPress={v => setState(p => ({ ...p, selected: v }))}
          />
        )}
      />
      <RenderImages images={State.categories[State.selected]?.data} />
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
