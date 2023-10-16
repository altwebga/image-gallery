import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Photo } from "@/models/photo";

interface PhotoState {
  photos: Photo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
}

const initialState: PhotoState = {
  photos: [],
  status: "idle",
  error: null,
  page: 1,
};

interface FetchError {
  message: string;
}

export const fetchPhotos = createAsyncThunk<
  Photo[],
  number,
  { rejectValue: FetchError }
>("photos/fetchPhotos", async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({ message: err.message });
    }
    throw err;
  }
});

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPhotos.fulfilled,
        (state, action: PayloadAction<Photo[]>) => {
          state.status = "succeeded";
          state.photos = state.photos.concat(action.payload);
          state.page += 1;
        }
      )
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Не удалось загрузить фотографии.";
      });
  },
});

export default photoSlice.reducer;
