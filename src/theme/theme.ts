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
        bg: mode('white', '#101010')(props),
        color: mode('black', 'white')(props),
      },
    })
  },
  breakpoints,
  colors: {
    "gray": {
      "50": "#F0F2F4",
      "100": "#D6DBE0",
      "200": "#BCC4CD",
      "300": "#A2ADB9",
      "400": "#8896A5",
      "500": "#6D7F92",
      "600": "#576675",
      "700": "#424C57",
      "800": "#2C333A",
      "900": "#16191D"
    },
    "primary": "#64d2ad",
    "black": "#2a2959",
    "pureWhite": "#FFFFFF",
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true,
    }
  }
});

export default theme;