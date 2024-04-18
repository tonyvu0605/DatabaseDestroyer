
export function responsiveFontSizes({ sm, md, lg }) {
  return {
    fontSize: sm,
    '@media (min-width: 600px)': {
      fontSize: sm,
    },
    '@media (min-width: 960px)': {
      fontSize: md,
    },
    '@media (min-width: 1280px)': {
      fontSize: lg,
    },
  };
}


export const primaryFont = 'Montserrat, sans-serif';
export const secondaryFont = 'Open Sans, sans-serif';

export const typography = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: primaryFont,
    fontWeight: 800,
    lineHeight: 1.25,
    ...responsiveFontSizes({ sm: '2.5rem', md: '3.5rem', lg: '4.5rem' }),
  },
  h2: {
    fontFamily: primaryFont,
    fontWeight: 800,
    lineHeight: 1.3,
    ...responsiveFontSizes({ sm: '2rem', md: '2.5rem', lg: '3rem' }),
  },
  h3: {
    fontFamily: primaryFont,
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: '1.5rem', md: '2rem', lg: '2.5rem' }),
  },
  h4: {
    fontFamily: primaryFont,
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: '1.25rem', md: '1.75rem', lg: '1.75rem' }),
  },
  h5: {
    fontFamily: primaryFont,
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: '1.25rem', md: '1.5rem', lg: '1.5rem' }),
  },
  h6: {
    fontFamily: primaryFont,
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: '1rem', md: '1.25rem', lg: '1.5rem' })
  },
  subtitle1: {
    fontFamily: secondaryFont,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: '1rem',
  },
  subtitle2: {
    fontFamily: secondaryFont,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: '0.875rem',
  },
  body1: {
    fontFamily: secondaryFont,
    lineHeight: 1.5,
    fontSize: '1rem',
  },
  body2: {
    fontFamily: secondaryFont,
    lineHeight: 1.5,
    fontSize: '0.875rem',
  },
  caption: {
    fontFamily: secondaryFont,
    lineHeight: 1.5,
    fontSize: '0.75rem',
  },
  overline: {
    fontFamily: secondaryFont,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: secondaryFont,
    fontWeight: 700,
    lineHeight: 1.75,
    fontSize: '0.9rem',
    textTransform: 'unset',
  },
};