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
      400: "#4C4B4B",
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
    Input: {
      variants: {
        settings: {
          field: {
            backgroundColor: "transparent",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "1px solid #FF5050",
          },
        },
      },
    },
    Menu: {
      variants: {
        dark: {
          list: {
            backgroundColor: "primary.500",
            color: "secondary.100",
            border: "1px solid #E0E0E0",
          },
          item: {
            backgroundColor: "primary.500",
            _hover: {
              bg: "primary.400",
            },
            _focus: {
              bg: "primary.400",
            },
          },
          button: {
            backgroundColor: "primary.500",
          },
          divider: {
            my: "4",
            borderColor: "secondary.100",
            borderBottom: "1px solid #E0E0E0",
          },
        },
      },
    },
  },
});
