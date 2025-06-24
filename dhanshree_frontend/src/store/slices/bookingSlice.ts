import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "@/lib/axios.instance";

export const verifyBooking = createAsyncThunk(
  "booking/verifyBooking",
  async (token: string) => {
    const res = await $axios.get(`/booking/verify?token=${token}`);
    console.log("Booking verification response:", res);
    return res.data;
  }
);

interface FetchBookingsParams {
  page?: number;
  size?: number;
  status?: string;
  email?: string;
}

export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async (params: FetchBookingsParams = {}) => {
    const { page = 1, size = 10, status, email } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    // Only append status and email if they have values
    if (status && status.trim() !== "") {
      queryParams.append("status", status);
    }
    if (email && email.trim() !== "") {
      queryParams.append("email", email);
    }

    const res = await $axios.get(`/booking?${queryParams.toString()}`);
    console.log("Fetched bookings:", res.data);
    return res.data;
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async ({
    id,
    date,
    status,
  }: {
    id: string;
    date?: string;
    status?: string;
  }) => {
    const updateData: { date?: string; status?: string } = {};
    if (date) updateData.date = date;
    if (status) updateData.status = status;

    const res = await $axios.patch(`/booking/${id}`, updateData);
    return res.data;
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "booking/resendVerificationEmail",
  async ({ email, propertyId }: { email: string; propertyId: string }) => {
    const res = await $axios.post("/booking/resend", {
      email,
      propertyId,
    });
    return res.data;
  }
);

// Keep old functions for backward compatibility
export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async ({ id, status }: { id: string; status: string }) => {
    const res = await $axios.patch(`/booking/${id}/status`, { status });
    return res.data;
  }
);

export const updateBookingDate = createAsyncThunk(
  "booking/updateBookingDate",
  async ({ id, date }: { id: string; date: string }) => {
    const res = await $axios.patch(`/booking/${id}/date`, { date });
    return res.data;
  }
);

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface Property {
  id: string;
  propertyCode: string;
  price: number;
  type: string;
  status: string;
  purpose: string;
  details: any;
}

interface Booking {
  id: string;
  createdAt: string;
  date: string;
  message: string;
  isVerified: boolean;
  status: string;
  adminConfirmedAt: string | null;
  emailSentCount: number;
  lastEmailSentAt: string;
  user: User;
  property: Property;
}

interface BookingState {
  isLoading: boolean;
  isVerified: boolean;
  error: string;
  data: {
    success: boolean;
    message: string;
  } | null;
  bookings: Booking[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  } | null;
  filters: {
    page: number;
    size: number;
    status: string;
    email: string;
  };
  // New states for resend functionality
  lastBookingResponse: any | null;
  isResending: boolean;
  resendError: string;
  canResend: boolean;
  resendTimer: number;
}

const initialState: BookingState = {
  isLoading: false,
  isVerified: false,
  error: "",
  data: null,
  bookings: [],
  pagination: null,
  filters: {
    page: 1,
    size: 10,
    status: "",
    email: "",
  },
  // New initial states
  lastBookingResponse: null,
  isResending: false,
  resendError: "",
  canResend: false,
  resendTimer: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFilters: (state: BookingState, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state: BookingState) => {
      state.filters = {
        page: 1,
        size: 10,
        status: "",
        email: "",
      };
    },
    setLastBookingResponse: (state: BookingState, action) => {
      state.lastBookingResponse = action.payload;
    },
    setCanResend: (state: BookingState, action) => {
      state.canResend = action.payload;
    },
    setResendTimer: (state: BookingState, action) => {
      state.resendTimer = action.payload;
    },
    resetBookingState: (state: BookingState) => {
      state.lastBookingResponse = null;
      state.canResend = false;
      state.resendTimer = 0;
      state.resendError = "";
    },
  },
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
        state.error = action.error.message ?? "Something went wrong";
      })

      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.data.results || [];
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.bookings = [];
        state.pagination = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = {
            ...state.bookings[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = {
            ...state.bookings[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateBookingDate.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = {
            ...state.bookings[index],
            ...action.payload,
          };
        }
      })
      // Resend verification email cases
      .addCase(resendVerificationEmail.pending, (state) => {
        state.isResending = true;
        state.resendError = "";
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.isResending = false;
        state.canResend = false;
        state.resendTimer = 30; // Reset timer for next resend
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isResending = false;
        state.resendError = action.error.message ?? "Failed to resend email";
      });
  },
});

export const {
  setFilters,
  resetFilters,
  setLastBookingResponse,
  setCanResend,
  setResendTimer,
  resetBookingState,
} = bookingSlice.actions;
export default bookingSlice.reducer;
