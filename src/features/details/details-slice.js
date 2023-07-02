import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
  '@@details/load-country-by-name',
  (name, {extra: {client, api}}) => {
    return client.get(api.searchByCountry(name))
  }
);

export const loadNeighboursByBorder = createAsyncThunk(
  '@@details/load-neighbours',
  (boarders, {extra: {client, api}}) => {
    return client.get(api.filterByCode(boarders))
  }
)

const initialState = {
  currentCountry: null,
  status: 'idle',
  error: null,
  neighbours: [],
}

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'received';
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error
      })
      .addCase(loadNeighboursByBorder.fulfilled, (state, action) => {
        state.neighbours = action.payload.data.map(country => country.name);
      })
  }
})

export const {clearDetails} = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

// selectors
export const selectCurrentCountry = state => state.details.currentCountry;
export const selectDetails = state => state.details;
export const selectNeighbours = state => state.details.neighbours;