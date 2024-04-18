const overrides = (theme) => ({
  MuiCssBaseline: {
    '@global': {
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.default,
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '1rem',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '.5rem',
        textTransform: 'none',
        fontWeight: 600,
        '&:hover': {
          boxShadow: 'none',
        },
      },
      sizeLarge: {
        height: 48,
      },
      containedInherit: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      },
      outlinedInherit: {
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.lighter,
          borderColor: theme.palette.primary.main,
        },
      },
      textInherit: {
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      gutterBottom: {
        marginBottom: 16,
      },
      paragraph: {
        marginBottom: 24,
      },
    },
  },
});

export default overrides;