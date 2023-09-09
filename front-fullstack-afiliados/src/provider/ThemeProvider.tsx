'use client'
import {ThemeProvider as Provider} from '@mui/system'
import {Theme} from "@mui/material";

const ThemeProvider: React.FC<{ children: React.ReactNode, theme?: Theme  }> = ({ children, theme }) => {
    return (
        <Provider theme={theme || {}}>
            { children }
        </Provider>
    )
}

export default ThemeProvider;
