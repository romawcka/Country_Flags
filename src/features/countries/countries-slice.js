const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loadCountries = createAsyncThunk(
  '@@countries/load-contries',
  (_, {extra: {client, api}}) => {
    return client.get(api.ALL_COUNTRIES);
  }
);

const initialState = {
  status: 'idle',
  // loading | received | rejected
  error: null,
  list: [],
}

const countriesSlice = createSlice({
  name: '@@counties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })

  }
});

export const {setLoading, setError, setCountries} = countriesSlice.actions;
export const countryReducer = countriesSlice.reducer;

// selectors
export const selectCountriesInfo = state => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length
});

export const selectAllCountries = state => state.countries.list;
export const selectVisibleCountries = (state, {search = '', region = ''}) => {
  return state.countries.list.filter (
    country => (
      country.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
      country.region.includes(region)
    )
  )
}