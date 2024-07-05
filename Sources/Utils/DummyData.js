import { Images, Strings } from '../Constants';

const DummyData = {
  Drawer: [
    {
      title: Strings.Home,
      key: 'home',
    },
    {
      title: Strings.PrivacyPolicy,
      key: 'privacy',
    },
    {
      title: Strings.Ratings,
      key: 'rateus',
    },
    {
      title: Strings.ShareThisApp,
      key: 'share',
    },
  ],
  steps: [
    {
      title: Strings.step_0_title,
      text: Strings.step_0_text,
    },
    {
      title: Strings.step_1_title,
      text: Strings.step_1_text,
    },
    {
      title: Strings.step_2_title,
      text: Strings.step_2_text,
    },
    {
      title: Strings.step_3_title,
      text: Strings.step_3_text,
    },
    {
      title: Strings.step_4_title,
      text: Strings.step_4_text,
    },
  ],
  plans: [
    {
      id: 0,
      title: Strings.MonthlyPlan,
      price: '$6.99',
    },
    {
      id: 1,
      title: Strings.YearlyPlan,
      price: '$12.99',
    },
  ],
  Home: {
    ImageOptions: [
      { id: 0, img: Images.home_all, title: Strings.All },
      { id: 1, img: Images.home_sketch, title: Strings.Sketch },
      { id: 2, img: Images.home_2d, title: '2D' },
      { id: 3, img: Images.home_cartoon, title: Strings.Cartoon },
      { id: 4, img: Images.home_3d, title: '3D' },
    ],
  },
};

export default DummyData;
