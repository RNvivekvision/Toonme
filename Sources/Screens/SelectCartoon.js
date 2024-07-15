import { useDispatch, useSelector } from 'react-redux';
import { RNContainer, RNHeader } from '../Common';
import {
  BouncyCard,
  ImageOptions,
  NativeAd,
  UnlockPremium,
} from '../Components';
import { NavRoutes } from '../Navigation';
import { setSelectedFilter, togglePremium } from '../Redux/Actions';
import { Strings } from '../Constants';
import { useUserClick } from '../Hooks';

const SelectCartoon = ({ navigation }) => {
  const { showPremium } = useSelector(({ UserReducer }) => UserReducer);
  const { incrementCount } = useUserClick();
  const dispatch = useDispatch();

  const onFilterPress = async filter => {
    dispatch(setSelectedFilter(filter?.combo_id));
    await incrementCount();
    navigation.navigate(NavRoutes.Result);
  };

  return (
    <RNContainer>
      <RNHeader title={Strings.SelectCartoon} back>
        <BouncyCard containerStyle={{ position: 'relative' }} />
        <ImageOptions onFilterPress={onFilterPress} />
      </RNHeader>
      <NativeAd />
      <UnlockPremium
        visible={showPremium}
        onClose={() => dispatch(togglePremium())}
        isSelectCartoon={true}
      />
    </RNContainer>
  );
};

export default SelectCartoon;
