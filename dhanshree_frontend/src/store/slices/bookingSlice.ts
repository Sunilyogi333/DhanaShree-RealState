import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "@/lib/axios.instance";



export const verifyBooking = createAsyncThunk(
  'booking/verifyBooking',
  async (token: string) => {
    const res = await $axios.get(`/booking/verify?token=${token}`);
    console.log('Booking verification response:', res);
    return res.data;
  }
);

interface BookingState {
  isLoading: boolean;
  isVerified: boolean;
  error: string;
  data:{
    success: boolean;
    message: string;
  } | null;
}

const initialState: BookingState= {
    isLoading: false,
    isVerified: false,
    error: "",
    data: null,
  };




const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(verifyBooking.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(verifyBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(verifyBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Something went wrong';
      });
  
  }
  });

  export const { } = bookingSlice.actions;
  export default bookingSlice.reducer;
  