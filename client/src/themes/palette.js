const PRIMARY = {
  lighter: '#FFE0B2',
  light: '#FFCC80',
  main: '#FF9800',
  dark: '#F57C00',
  darker: '#E65100',
  contrastText: '#000000',
};

const SECONDARY = {
  lighter: '#87CEFA',
  light: '#00BFFF',
  main: '#1E90FF',
  dark: '#0000FF',
  darker: '#000080',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E8F5E9',
  light: '#C8E6C9',
  main: '#4CAF50',
  dark: '#388E3C',
  darker: '#1B5E20',
  contrastText: '#FFFFFF',
};

const ERROR = {
  lighter: '#FFEBEE',
  light: '#FFCDD2',
  main: '#F44336',
  dark: '#D32F2F',
  darker: '#B71C1C',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF3E0',
  light: '#FFE0B2',
  main: '#FFA726',
  dark: '#F57C00',
  darker: '#E65100',
  contrastText: '#000000',
};

const INFO = {
  lighter: '#E1F5FE',
  light: '#B3E5FC',
  main: '#03A9F4',
  dark: '#0288D1',
  darker: '#01579B',
  contrastText: '#FFFFFF',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

const palette = (mode) => ({
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: '#fff' },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  divider: mode === 'dark' ? GREY[700] : GREY[200],
  text: {
    primary: mode === 'dark' ? '#fff' : GREY[800],
    secondary: mode === 'dark' ? GREY[500] : GREY[600],
    disabled: mode === 'dark' ? GREY[600] : GREY[500],
  },
  background: {
    paper: mode === 'dark' ? GREY[800] : '#fff',
    default: mode === 'dark' ? GREY[900] : GREY[100],
  },
  action: {
    active: mode === 'dark' ? GREY[500] : GREY[600],
    hover: mode === 'dark' ? GREY[700] : GREY[300],
    selected: mode === 'dark' ? GREY[600] : GREY[400],
    disabled: mode === 'dark' ? GREY[800] : GREY[300],
    disabledBackground: mode === 'dark' ? GREY[900] : GREY[200],
    focus: mode === 'dark' ? GREY[700] : GREY[200],
  },
});

export default palette;