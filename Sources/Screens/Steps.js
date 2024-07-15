import { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { RNButton, RNContainer, RNHeader } from '../Common';
import { NativeAd, RenderSteps } from '../Components';
import { DummyData } from '../Utils';
import { Strings } from '../Constants';
import { useUserClick } from '../Hooks';

const Steps = ({ navigation }) => {
  const flatListRef = useRef();
  const { incrementCount } = useUserClick();
  const [State, setState] = useState({ currentSlider: 0 });
  const title = `Step ${State.currentSlider + 1} of ${DummyData.steps.length}`;

  const onViewableItemsChanged = ({ viewableItems }) => {
    const currentSlider = viewableItems[0].index;
    setState(p => ({ ...p, currentSlider }));
  };

  const onSkipPress = () => {
    if (State.currentSlider + 1 >= DummyData.steps.length) {
      navigation.goBack();
      return;
    }
    flatListRef.current.scrollToIndex({
      animated: true,
      index: DummyData.steps.length - 1,
    });
  };

  const onNextPress = async () => {
    await incrementCount();
    if (State.currentSlider + 1 >= DummyData.steps.length) {
      navigation.goBack();
      return;
    }
    flatListRef.current.scrollToIndex({
      animated: true,
      index: State.currentSlider + 1,
    });
  };

  return (
    <RNContainer useSafeArea>
      <RNHeader back noScroll title={title} onSkipPress={onSkipPress}>
        <FlatList
          ref={flatListRef}
          data={DummyData.steps}
          keyExtractor={(v, i) => String(i)}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          renderItem={({ item, index }) => (
            <RenderSteps item={item} index={index} />
          )}
        />
        <RNButton title={Strings.Next} onPress={onNextPress} />
        <NativeAd />
      </RNHeader>
    </RNContainer>
  );
};

export default Steps;
