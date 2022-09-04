import { local } from 'd3'
import darkMode from '../../components/Settings/darkMode'
import lightMode from '../../components/Settings/lightMode'

//ACTION TYPE
const TOGGLE_THEME = 'TOGGLE_THEME'

//ACTION CREATOR

export const toggleTheme = () => {
    console.log('BUSSY')
    return {
        type: TOGGLE_THEME
    }
} 

//INITIAL STATE
const initialState = () => {
    let theme = localStorage.getItem('theme')
        if (!theme || theme === 'light') theme = lightMode 
            else theme = darkMode
                return {
                    theme
                }
}

// REDUCER

export default function (state = initialState(), action) {
    let updatedState = {...state}
    switch (action.type) {
        case TOGGLE_THEME:
            state.theme === lightMode ? updatedState.theme = darkMode : updatedState.theme = lightMode
                localStorage.setItem('theme', updatedState.theme == lightMode ? 'light' : 'dark')
                    return updatedState

        default: return state
    }
    
}