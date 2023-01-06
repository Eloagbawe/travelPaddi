import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import itineraryReducer from '../features/itineraries/itinerarySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    itinerary: itineraryReducer
  },
});
