import {Box} from "@chakra-ui/react";

export const HaystackHeading = (props: any) => {
    return (
        <Box
            {...props}
            fontWeight="bold"
            color="gray.600"
            textTransform="uppercase"
        >
            {props.children}
        </Box>
    )
}