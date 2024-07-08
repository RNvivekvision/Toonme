import { useSelector } from 'react-redux';
import { Colors } from '../Theme';

const useAdStyles = () => {
  const { adData } = useSelector(({ UserReducer }) => UserReducer);

  // styles...
  const containerBgColor = {
    backgroundColor: Colors.Black,
  };
  const textColor = { color: Colors.Black };
  const buttonBgColor = {
    backgroundColor: Colors.Primary,
  };
  const buttonTextColor = {
    color: Colors.Black,
  };

  return {
    containerBgColor,
    textColor,
    buttonBgColor,
    buttonTextColor,
  };
};

export default useAdStyles;
