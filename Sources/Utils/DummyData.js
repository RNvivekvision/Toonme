import { Images } from '../Constants';

const DummyData = {
  Drawer: [
    {
      title: 'Home',
      key: 'home',
    },
    {
      title: 'Privacy Policy',
      key: 'privacy',
    },
    {
      title: 'Ratings',
      key: 'rateus',
    },
    {
      title: 'Share This App',
      key: 'share',
    },
  ],
  steps: [
    {
      title: 'Upload Your Photo',
      text: 'Start by selecting a photo from your gallery or taking a new one.',
    },
    {
      title: 'Select a Cartoon Style',
      text: 'Simply swipe through the styles & tap on your favorite to apply it to your photo.',
    },
    {
      title: 'Customize Your Cartoon',
      text: 'Make your cartoon unique with our customization options.',
    },
    {
      title: 'Add Fun Elements',
      text: 'Drag and drop elements onto your cartoon & adjust their size and position to your liking.',
    },
    {
      title: 'Save and Share',
      text: "Once you're happy with your creation, save it your device or share it directly from the app.",
    },
  ],
  plans: [
    {
      id: 0,
      title: 'Monthly Plan',
      price: '$6.99',
    },
    {
      id: 1,
      title: 'Yearly Plan',
      price: '$12.99',
    },
  ],
  Home: {
    ImageOptions: [
      { id: 0, img: Images.home_all, title: 'All' },
      { id: 1, img: Images.home_sketch, title: 'Sketch' },
      { id: 2, img: Images.home_2d, title: '2D' },
      { id: 3, img: Images.home_cartoon, title: 'Cartoon' },
      { id: 4, img: Images.home_3d, title: '3D' },
    ],
  },
};

export default DummyData;
