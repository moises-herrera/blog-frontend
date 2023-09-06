import { extendTheme } from "@chakra-ui/react";

/**
 * App theme.
 */
export const appTheme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    primary: {
      500: "#2F2F2F",
    },
    accent: {
      500: "#FF5050",
      600: "#f53636",
    },
    secondary: {
      100: "#E0E0E0",
      200: "#D3D3D3",
      300: "#7B7B7B",
      400: "#C3C3C3",
    },
  },
  components: {
    Button: {
      variants: {
        brand: {
          bg: "accent.500",
          textColor: "secondary.100",
        },
        form: {
          bg: "accent.500",
          textColor: "secondary.100",
          fontWeight: "500",
          rounded: "20px",
          size: "md",
          paddingX: "60px",
          paddingY: "5px",
        },
      },
    },
  },
});
