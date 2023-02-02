import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { TFetchError, TSiteResult } from '../../types/requestResult';

type TResultState = {
  resultArray: TSiteResult[],
  loading: boolean,
  error: null | TFetchError,
};

const initialState: TResultState = {
  resultArray: [],
  loading: false,
  error: null,
};

type TIncomingURL = {
  id: string,
  requestURL: string,
  requestCategory: string,
};

const _api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

function fetchAPI(url: TIncomingURL): Promise<Response> {
  console.log(url);
  const _urlParams = {
    url: encodeURIComponent(url.requestURL),
    category: url.requestCategory,
  }
  let _requestURL = `${_api}`;
  let _key: keyof typeof _urlParams;

  for (_key in _urlParams) {
    _requestURL += `?${_key}=${_urlParams[_key]}`;
  }
  _requestURL += `&${process.env.REACT_APP_PAGESPEED_API_KEY}`;
  return fetch(_requestURL);
};


export const getTestsResult = createAsyncThunk<void, TIncomingURL[], { dispatch: Dispatch }>(
  'resultsSlice/getTestsResults',
  function (requestData, { dispatch }) {
    let promisesArray = requestData.map(requestItem => fetchAPI(requestItem).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return Promise.reject({
          reponseCode: res.status,
          errorDescription: `Server error! Request ended with ${res.status} status.`,
        });
      }
    }));
    Promise.all(promisesArray).then(data => dispatch(setResult(data))).then(() => dispatch(setLoading(false))).catch(err => dispatch(setError(err)));
  }
);

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResult: (state, action: PayloadAction<TSiteResult[]>) => {
      // if (!state.resultArray.filter(item => item.id === action.payload.id).length) {
      //   state.resultArray.push(action.payload);
      // }
      state.resultArray = action.payload;
    },
    cleanResult: (state) => {
      state.resultArray = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
  extraReducers: builder => (
    builder
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

export const { setResult, setLoading, cleanResult, setError } = resultSlice.actions;
export default resultSlice.reducer;