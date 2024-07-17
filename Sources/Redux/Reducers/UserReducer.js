import { createSlice } from '@reduxjs/toolkit';
import { getAdData, getFilters } from '../ExtraReducers';

const initialState = {
  showPlans: false,
  clickCount: 0,
  adLoading: false,
  adData: null,
  clickAds: false,
  Admob: null,
  Admanager1: null,
  Admanager2: null,
  filters: [],
  clickedImage: null,
  selectedFilter: null,
  showPremium: false,
  subscriptionPurchase: false,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    togglePlans: s => {
      s.showPlans = !s.showPlans;
    },
    togglePremium: s => {
      s.showPremium = !s.showPremium;
    },
    increaseCount: (s, a) => {
      s.clickCount = s.clickCount + 1;
      s.clickAds = s.clickCount % s.adData?.innerPageAdClickCount === 0;
    },
    showAdLoader: (s, a) => {
      s.adLoading = a.payload;
    },
    setClickedImage: (s, a) => {
      s.clickedImage = a.payload;
    },
    setSelectedFilter: (s, a) => {
      s.selectedFilter = a.payload;
    },
    setSubscriptionPurchase: (s, a) => {
      s.subscriptionPurchase = a.payload;
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

    b.addCase(getFilters.pending, s => {
      s.adLoading = true;
    });
    b.addCase(getFilters.fulfilled, (s, a) => {
      s.adLoading = false;
      s.filters = a.payload;
    });
    b.addCase(getFilters.rejected, (s, a) => {
      s.adLoading = false;
    });
  },
});

export const {
  togglePlans,
  togglePremium,
  increaseCount,
  showAdLoader,
  setClickedImage,
  setSelectedFilter,
  setSubscriptionPurchase,
} = UserReducer.actions;
export default UserReducer.reducer;
