import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
      login: {
        main: '#009688',
        contrastText: '#fff',
      },
    },
  });

const ButtonCustom = ({onClick, name}) => {
    return (
      <ThemeProvider theme={theme}>
        <Button color="login" variant="contained" onClick={onClick}>
          {name}
        </Button>
      </ThemeProvider>
    );
  }

  export default ButtonCustom;