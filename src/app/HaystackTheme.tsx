import {extendTheme, theme} from "@chakra-ui/react"

const colors = {
    haystack: {
        50: theme.colors.red["50"],
        100: theme.colors.red["100"],
        200: theme.colors.red["200"],
        300: theme.colors.red["300"],
        400: theme.colors.red["400"],
        500: "#B74040", //theme.colors.red["500"],
        600: theme.colors.red["600"],
        700: theme.colors.red["700"],
        800: theme.colors.red["800"],
        900: theme.colors.red["900"],
    },
}

const components = {
    Button: {
        baseStyle: {
            fontSize: "1.25rem",
            fontWeight: 800,
            borderRadius: "md",
            py: 2
        },
        defaultProps: {
            colorScheme: "haystack"
        }
    }
}

const styles = {
    global: {
        "html, body": {
            background: "red.600",
            fontFamily: "Poppins"
        }
    }
}

const shadows = {
    outline: `0 0 0 3px ${colors.haystack["200"]}`
}

const fontSizes = {
    "2xs": "0.625rem"
}

export const HaystackTheme = extendTheme({
    styles: styles,
    colors: colors,
    components: components,
    shadows: shadows,
    fontSizes: fontSizes
})