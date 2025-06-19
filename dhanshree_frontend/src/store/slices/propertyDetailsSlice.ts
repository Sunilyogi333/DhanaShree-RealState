import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "@/lib/axios.instance";
import { fetchPropertyDetails } from "@/types/property";

interface PropertyState {
  posts: fetchPropertyDetails[]; // For List page
  featuredPosts: fetchPropertyDetails[]; // For featured carousel
  exclusivePosts: fetchPropertyDetails[]; // For exclusive carousel
  latestPosts: fetchPropertyDetails[]; // For latest carousel
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

const initialState: PropertyState = {
  posts: [],
  featuredPosts: [],
  exclusivePosts: [],
  latestPosts: [],
  isLoading: false,
  error: null,
  pagination: {
    total: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 5,
  },
};

interface PropertyDetailsState {
  selectedPost: fetchPropertyDetails | null;
  isLoading: boolean;
  error: string | null;
}

const detailInitialState: PropertyDetailsState = {
  selectedPost: null,
  isLoading: false,
  error: null,
};

// Interface for API parameters
interface PropertyFilters {
  page?: number;
  size?: number;
  type?: string;
  status?: string;
  purpose?: string;
  minPrice?: string | number; // Accept both string and number
  maxPrice?: string | number; // Accept both string and number
  district?: string;
  municipality?: string;
  propertyCode?: string;
}

// General fetch for List page
export const fetchProperty = createAsyncThunk(
  "property/fetchProperty",
  async (params: PropertyFilters) => {
    // Clean up parameters - remove empty strings and undefined values
    const cleanParams: Record<string, any> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        // Convert minPrice and maxPrice to strings for URL params
        if (key === "minPrice" || key === "maxPrice") {
          cleanParams[key] = value.toString();
        } else {
          cleanParams[key] = value;
        }
      }
    });

    console.log("Clean parameters being sent to API:", cleanParams);

    const response = await $axios.get("/property", {
      params: cleanParams,
    });

    console.log("API Response:", response);

    if (response.status !== 200) throw new Error("Failed to fetch properties");

    return {
      results: response.data.data.results || [],
      pagination: {
        ...response.data.data.pagination,
        currentPage: params.page || 1,
      } || {
        total: 0,
        totalPages: 0,
        currentPage: params.page || 1,
        perPage: params.size || 5,
      },
      requestParams: cleanParams,
    };
  }
);

// Specific thunks for each carousel with status parameter
export const fetchFeaturedProperties = createAsyncThunk(
  "property/fetchFeaturedProperties",
  async (params: PropertyFilters = {}) => {
    const cleanParams: Record<string, any> = { status: "featured" };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await $axios.get("/property", {
      params: cleanParams,
    });

    console.log("Featured properties response:", response);
    return response.data.data.results || [];
  }
);

export const fetchExclusiveProperties = createAsyncThunk(
  "property/fetchExclusiveProperties",
  async (params: PropertyFilters = {}) => {
    const cleanParams: Record<string, any> = { status: "exclusive" };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await $axios.get("/property", {
      params: cleanParams,
    });

    console.log("Exclusive properties response:", response);
    return response.data.data.results || [];
  }
);

export const fetchLatestProperties = createAsyncThunk(
  "property/fetchLatestProperties",
  async (params: PropertyFilters = {}) => {
    const cleanParams: Record<string, any> = { status: "latest" };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await $axios.get("/property", {
      params: cleanParams,
    });

    console.log("Latest properties response:", response);
    return response.data.data.results || [];
  }
);

export const fetchPropertyById = createAsyncThunk(
  "propertyDetails/fetchPropertyById",
  async (propertyCode: string) => {
    const res = await $axios.get(`/property/${propertyCode}`);
    console.log("Property details response:", res);
    return res.data.data;
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // General property fetch (for List page)
      .addCase(fetchProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.results;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.posts = [];
      })
      // Featured properties
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.featuredPosts = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        console.error("Failed to fetch featured properties:", action.error);
        state.featuredPosts = [];
      })
      // Exclusive properties
      .addCase(fetchExclusiveProperties.fulfilled, (state, action) => {
        state.exclusivePosts = action.payload;
      })
      .addCase(fetchExclusiveProperties.rejected, (state, action) => {
        console.error("Failed to fetch exclusive properties:", action.error);
        state.exclusivePosts = [];
      })
      // Latest properties
      .addCase(fetchLatestProperties.fulfilled, (state, action) => {
        state.latestPosts = action.payload;
      })
      .addCase(fetchLatestProperties.rejected, (state, action) => {
        console.error("Failed to fetch latest properties:", action.error);
        state.latestPosts = [];
      });
  },
});

const propertyDetailsSlice = createSlice({
  name: "propertyDetails",
  initialState: detailInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch the property";
      });
  },
});

export const propertyReducer = propertySlice.reducer;
export const propertyDetailsReducer = propertyDetailsSlice.reducer;
