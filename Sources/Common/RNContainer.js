import { useSelector } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { Colors } from '../Theme';
import { useInset } from '../Hooks';
import RNStyles from './RNStyles';
import RNLoader from './RNLoader';

const RNContainer = ({ style, children, isLoading, useSafeArea }) => {
  const { adLoading } = useSelector(({ UserReducer }) => UserReducer);
  const inset = useInset();

  return (
    <View
      style={[
        RNStyles.container,
        style,
        useSafeArea && { paddingBottom: inset.bottom },
      ]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={Colors.Transparent}
      />
      <RNLoader visible={isLoading || adLoading} />
      {children}
    </View>
  );
};

export default RNContainer;
