import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "@/lib/axios.instance";
import { fetchPropertyDetails } from "@/types/property";

interface PropertyState {
  posts: fetchPropertyDetails[];
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
export const fetchProperty = createAsyncThunk('property/fetchProperty', async ({ page = 1, size = 5 }: { page?: number; size?: number }) => {
  const response = await $axios.get('/property', {
    params: { page, size },
  });

  console.log("response in the thunk", response);

  if (response.status !== 200) throw new Error('Failed to fetch posts');
  return response.data.data; 
});

export const fetchPropertyById = createAsyncThunk('property/fetchPropertyById', async (propertyCode: string) => {
  const res = await $axios.get(`/property/${propertyCode}`);
  console.log("response in the thunk", res);
  return res.data.data;
});

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProperty.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchProperty.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.properties;
      state.pagination = action.payload.pagination;
    })
    .addCase(fetchProperty.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });

}
});


const propertyDetailsSlice = createSlice({
  name: "propertyDetails",
  initialState: detailInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchPropertyById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchPropertyById.fulfilled, (state, action) => {
      state.isLoading = false;	
      state.selectedPost = action.payload;
    })
    .addCase(fetchPropertyById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Failed to fetch the post";
    });
},
});

export const propertyReducer = propertySlice.reducer;
export const propertyDetailsReducer = propertyDetailsSlice.reducer;
