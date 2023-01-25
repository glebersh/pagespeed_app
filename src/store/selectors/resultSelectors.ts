import { RootState } from "..";
import { TFetchError, TSiteResult } from "../../types/requestResult";

export const errorSelector = (state: RootState): TFetchError | null => state.resultReducer.error;
export const loadingSelector = (state: RootState): boolean => state.resultReducer.loading;
export const resultDataSelector = (state: RootState): TSiteResult[] => state.resultReducer.resultArray;