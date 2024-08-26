import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1760a5",
            light: "skyblue"
        },
        secondary: {
            main: '#15c630',
        },
        otherColor: {
            main: '#ff0000'
        },
        // 문1) 색상을 추가가 지정하세요
        vv: {
            main: 'red'
        },
    },
});
