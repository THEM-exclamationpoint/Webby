import {local} from 'd3'
import darkMode from '../../components/Settings/darkMode'
import lightMode from '../../components/Settings/lightMode'

//ACTION TYPE
const TOGGLE_THEME = 'TOGGLE_THEME'
const TOGGLE_HIGH_CONTRAST = 'TOGGLE_HIGH_CONTRAST'

//ACTION CREATOR

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  }
}

export const toggleHighContrast = () => {
  return {
    type: TOGGLE_HIGH_CONTRAST,
  }
}

//INITIAL STATE
const initialState = () => {
  let hc = localStorage.getItem('highcontrast')
  let highContrast = JSON.parse(hc)
  let theme = localStorage.getItem('theme')
  if (!theme || theme === 'light') theme = lightMode
  else theme = darkMode
  if (!highContrast) highContrast = false
  return {
    theme,
    highContrast,
  }
}

// REDUCER

export default function (state = initialState(), action) {
  let updatedState = {...state}
  switch (action.type) {
    case TOGGLE_THEME:
      state.theme === lightMode
        ? (updatedState.theme = darkMode)
        : (updatedState.theme = lightMode)
      localStorage.setItem(
        'theme',
        updatedState.theme == lightMode ? 'light' : 'dark'
      )
      return updatedState
    case TOGGLE_HIGH_CONTRAST:
      updatedState.highContrast = !state.highContrast
      localStorage.setItem(
        'highcontrast',
        JSON.stringify(updatedState.highContrast)
      )
      return updatedState
    default:
      return state
  }
}
