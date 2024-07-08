import { createSlice } from '@reduxjs/toolkit';
import { getAdData } from '../ExtraReducers';

const initialState = {
  showPlans: false,
  showCamera: false,
  clickCount: 0,
  adLoading: false,
  adData: null,
  clickAds: false,
  Admob: null,
  Admanager1: null,
  Admanager2: null,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    togglePlans: s => {
      s.showPlans = !s.showPlans;
    },
    toggleCamera: s => {
      s.showCamera = !s.showCamera;
    },
    increaseCount: (s, a) => {
      s.clickCount = s.clickCount + 1;
      s.clickAds = s.clickCount % s.adData?.innerPageAdClickCount === 0;
    },
    showAdLoader: (s, a) => {
      s.adLoading = a.payload;
    },
  },
  extraReducers: b => {
    b.addCase(getAdData.pending, s => {
      s.adLoading = true;
    });
    b.addCase(getAdData.fulfilled, (s, a) => {
      s.adLoading = false;
      s.adData = a.payload;
      s.Admob = a.payload?.placement?.Admob;
      s.Admanager1 = a.payload?.placement?.Admanager1;
      s.Admanager2 = a.payload?.placement?.Admanager2;
    });
    b.addCase(getAdData.rejected, (s, a) => {
      s.adLoading = false;
      s.adData = a.payload;
      // s = a.payload;
    });
  },
});

export const { togglePlans, toggleCamera, increaseCount, showAdLoader } =
  UserReducer.actions;
export default UserReducer.reducer;
