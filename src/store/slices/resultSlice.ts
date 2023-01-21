import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { TSiteResult } from '../../types/requestResult';

type TResultState = {
  resultArray: TSiteResult[],
  loading: boolean,
  error: null | {},
};

const initialState: TResultState = {
  resultArray: [],
  loading: false,
  error: null,
};

type TResponseError = {
  reponseCode: number,
  errorDescription: string,
};

type TIncomingURL = {
  id: string,
  requestURL: string,
  requestCategory: string,
};


export const getTestsResult = createAsyncThunk<void, TIncomingURL[], { dispatch: Dispatch, rejectValue: TResponseError }>(
  'resultsSlice/getTestsResults',

  function (requestData, { dispatch, rejectWithValue }) {
    const _api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

    requestData.forEach(async function (params, index) {
      const _urlParams = {
        url: encodeURIComponent(params.requestURL),
        category: params.requestCategory,
      };

      let _requestURL = `${_api}`;
      let _key: keyof typeof _urlParams;

      for (_key in _urlParams) {
        _requestURL += `?${_key}=${_urlParams[_key]}`;
      }
      _requestURL += `&${process.env.REACT_APP_PAGESPEED_API_KEY}`;
      console.log(_requestURL);

      const response = await fetch(_requestURL);
      if (!response.ok) {
        return rejectWithValue({
          reponseCode: response.status,
          errorDescription: `Server error! Request ended with ${response.status} status`,
        })
      }
      else {
        const data = await response.json();
        dispatch(setResult(data));

        if (index === requestData.length - 1) {
          dispatch(setLoading(false));
        };
      }
    })
  }
);

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResult: (state, action: PayloadAction<TSiteResult>) => {
      if (!state.resultArray.filter(item => item.id === action.payload.id).length) {
        state.resultArray.push(action.payload);
      }
    },
    cleanResult: (state) => {
      state.resultArray = [];
    }
  },
  extraReducers: builder => (
    builder
      .addCase(getTestsResult.rejected,
        (state, action) => {
          if (action.payload) {
            state.error = action.payload
          } else {
            state.error = action.error;
          }
        })
      .addCase(getTestsResult.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(getTestsResult.fulfilled,
        (state) => {
          state.error = null;
        })
  )
});

export const { setResult, setLoading, cleanResult } = resultSlice.actions;
export default resultSlice.reducer;