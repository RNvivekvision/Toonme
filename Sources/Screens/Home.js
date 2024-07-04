import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlans } from '../Redux/Actions';
import { RNStyles } from '../Common';
import { NativeAd, TOHeader, TryForFree, Plans } from '../Components';

const Home = ({ navigation }) => {
  const { showPlans } = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();

  return (
    <View style={RNStyles.container}>
      <TOHeader title={'Toon Me'}>
        <TryForFree />
      </TOHeader>
      <NativeAd />
      <Plans visible={showPlans} onClose={() => dispatch(togglePlans())} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
