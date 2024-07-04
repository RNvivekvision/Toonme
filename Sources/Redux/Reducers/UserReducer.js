import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPlans: false,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    togglePlans: s => {
      s.showPlans = !s.showPlans;
    },
  },
});

export const { togglePlans } = UserReducer.actions;
export default UserReducer.reducer;
