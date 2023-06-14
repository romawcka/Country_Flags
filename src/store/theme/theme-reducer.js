import {SET_THEME} from './theme-actions'

export const themeReducer = (state = 'light', {type, payload}) => {
  switch (type) {
    case SET_THEME:
      return payload;
    default:
      return state;
  }
}

// аналогично
// export const themeReducer = (state = 'light', action.type, action.payload}) => {
//   switch (action.type) {
//   }
// }