import { extendTheme } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

const breakpoints = {
  xs: "320px",
  s: "480px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  xxl: "1440px"
};

const theme = extendTheme({
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode('white', '#1a1a1a')(props),
        color: mode('black', 'white')(props),
      },
    })
  },
  breakpoints,
  colors: {
    "primary": "#ef233c",
    "secondary": "#d90429",
    "lightgray": "#edf2f4",
    "cement": "#8d99ae",
    "deepdarkblue": "#2b2d42",
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    }
  }
});

export default theme;