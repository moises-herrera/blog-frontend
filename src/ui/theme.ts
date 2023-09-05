import { extendTheme } from '@chakra-ui/react';

/**
 * App theme.
 */
export const appTheme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  colors: {
    accent: {
      500: '#FF5050',
      600: '#f53636',
    },
  },
  components: {
    Button: {
      variants: {
        brand: {
          bg: 'accent.500',
          textColor: 'white',
        },
      },
    },
  },
});
