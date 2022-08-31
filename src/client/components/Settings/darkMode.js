import {useState} from 'react'
import { ThemeProvider } from 'styled-components'

export const LightTheme = {
    pageBackground: "snow"
}

export const DarkTheme = {
    pageBackground: "282c36"
}

export const themes = {
    light: LightTheme,
    dark: DarkTheme
}

export default function DarkThemeToggle () {
    const [theme, setTheme] = useState('light')
    return(
        <ThemeProvider theme={themes[theme]} />
    )
}