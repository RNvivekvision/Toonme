import { StyleSheet, View } from 'react-native';
import { RNText } from '../Common';
import { Plans } from '../Components';

const Home = ({ navigation }) => {
  return (
    <View>
      <RNText>Home</RNText>
      <Plans />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
