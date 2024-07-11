import { useSelector } from 'react-redux';
import { Colors } from '../Theme';

const useAdStyles = () => {
  const { adData } = useSelector(({ UserReducer }) => UserReducer);

  // styles...
  const containerBgColor = {
    backgroundColor: adData?.appMoreFieldAdsBackgroundColor || Colors.Black,
  };
  const textColor = { color: adData?.appMoreFieldAdsTextColor || Colors.Black };
  const buttonBgColor = {
    backgroundColor: adData?.appMoreFieldAdsButtonColor || Colors.Primary,
  };
  const buttonTextColor = {
    color: adData?.appMoreFieldAdsButtonTextColor || Colors.Black,
  };

  return {
    containerBgColor,
    textColor,
    buttonBgColor,
    buttonTextColor,
  };
};

export default useAdStyles;
