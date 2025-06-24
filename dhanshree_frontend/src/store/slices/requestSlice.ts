import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "@/lib/axios.instance";

export const verifyRequest = createAsyncThunk(
  "request/verifyRequest",
  async (token: string) => {
    const res = await $axios.get(`/request/verify?token=${token}`);
    console.log("Request verification response:", res);
    return res.data;
  }
);

export const submitRequest = createAsyncThunk(
  "request/submitRequest",
  async (requestData: {
    fullName: string;
    email: string;
    phone: string;
    date: string;
    message: string;
    address: string;
  }) => {
    const res = await $axios.post("/request", requestData);
    return res.data;
  }
);

export const resendRequestVerification = createAsyncThunk(
  "request/resendRequestVerification",
  async (requestId: string) => {
    console.log("Resending request verification for ID:", requestId);
    const res = await $axios.post("/request/resend", {
      requestId,
    });
    return res.data;
  }
);

// New thunks for admin request management
export const fetchAllRequests = createAsyncThunk(
  "request/fetchAllRequests",
  async (params: {
    page?: number;
    size?: number;
    status?: string;
    email?: string;
  }) => {
    const res = await $axios.get("/request", { params });
    console.log("Fetch requests response:", res.data);
    return res.data;
  }
);

export const updateRequestStatus = createAsyncThunk(
  "request/updateRequestStatus",
  async ({ id, status }: { id: string; status: string }) => {
    const res = await $axios.patch(`/request/${id}`, { status });
    console.log("Update request status response:", res.data);
    return { id, status, data: res.data };
  }
);

interface User {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface Request {
  id: string;
  createdAt: string;
  user: User;
  date: string;
  message: string;
  isVerified: boolean;
  status: string;
  adminConfirmedAt: string | null;
  lastEmailSentAt: string;
  emailSentCount: number;
  address: string;
}

interface RequestState {
  isLoading: boolean;
  isVerified: boolean;
  error: string;
  data: {
    success: boolean;
    message: string;
  } | null;
  lastRequestResponse: any | null;
  isResending: boolean;
  resendError: string;
  canResend: boolean;
  resendTimer: number;
  // New state for admin request management
  requests: Request[];
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
  isUpdating: boolean;
}

const initialState: RequestState = {
  isLoading: false,
  isVerified: false,
  error: "",
  data: null,
  lastRequestResponse: null,
  isResending: false,
  resendError: "",
  canResend: false,
  resendTimer: 0,
  // New state
  requests: [],
  pagination: null,
  filters: {
    page: 1,
    size: 10,
    status: "",
    email: "",
  },
  isUpdating: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setLastRequestResponse: (state, action) => {
      state.lastRequestResponse = action.payload;
    },
    setCanResend: (state, action) => {
      state.canResend = action.payload;
    },
    setResendTimer: (state, action) => {
      state.resendTimer = action.payload;
    },
    resetRequestState: (state) => {
      state.lastRequestResponse = null;
      state.canResend = false;
      state.resendTimer = 0;
      state.resendError = "";
    },
    // New reducers for request filters
    setRequestFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetRequestFilters: (state) => {
      state.filters = {
        page: 1,
        size: 10,
        status: "",
        email: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyRequest.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(verifyRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isVerified = true;
      })
      .addCase(verifyRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(submitRequest.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(submitRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastRequestResponse = action.payload;
      })
      .addCase(submitRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to submit request";
      })
      .addCase(resendRequestVerification.pending, (state) => {
        state.isResending = true;
        state.resendError = "";
      })
      .addCase(resendRequestVerification.fulfilled, (state, action) => {
        state.isResending = false;
        state.canResend = false;
        state.resendTimer = 30; // Reset timer for next resend
      })
      .addCase(resendRequestVerification.rejected, (state, action) => {
        state.isResending = false;
        state.resendError = action.error.message ?? "Failed to resend email";
      })
      // New cases for admin request management
      .addCase(fetchAllRequests.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload.data.requests;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch requests";
      })
      .addCase(updateRequestStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = "";
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Update the specific request in the array
        const requestIndex = state.requests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (requestIndex !== -1) {
          state.requests[requestIndex].status = action.payload.status;
        }
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message ?? "Failed to update request status";
      });
  },
});

export const {
  setLastRequestResponse,
  setCanResend,
  setResendTimer,
  resetRequestState,
  setRequestFilters,
  resetRequestFilters,
} = requestSlice.actions;

export default requestSlice.reducer;
