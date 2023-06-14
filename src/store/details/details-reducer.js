import { SET_COUNTRY, SET_ERROR, SET_LOADING, CLEAR_DETAILS, SET_NEIGHBORS } from './details-actions';

const initialState = {
  currentCountry: null,
  status: 'idle',
  error: null,
  neighbors: [],
}

export const detailsReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case SET_LOADING:
      return {
        ...state,
        status: 'loading',
        error: null,
      }
    case SET_ERROR:
      return {
        ...state,
        status: 'rejected',
        error: payload,
      }
    case SET_COUNTRY:
      return {
        ...state,
        currentCountry: payload,
        status: 'received',
      }
    case SET_NEIGHBORS:
      return {
        ...state,
        neighbors: payload,
      }
    case CLEAR_DETAILS:
      return initialState;
    default:
      return state
  }
}