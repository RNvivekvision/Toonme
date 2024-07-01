import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Colors, wp } from '../Theme';

const RNProgress = ({ progress }) => {
  const animatedStyle = useAnimatedStyle(
    () => ({
      width: `${progress.value}%`,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Animated.View style={[styles.bar, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(8),
    borderWidth: 1,
    padding: wp(1.5),
    borderRadius: 100,
    borderColor: Colors.Primary,
  },
  barContainer: {
    height: wp(2),
    width: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.Primary,
    borderRadius: 100,
  },
});

export default RNProgress;
