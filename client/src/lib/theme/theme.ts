import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        },
        secondary: {
            main: "#2f806aff"
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',

        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },

        body1: { fontWeight: 400 },
        body2: { fontWeight: 500 },

        button: {
            fontWeight: 600,
            textTransform: 'none'
        }
    },
});