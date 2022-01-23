import {Box, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export const MapTimer = (props: any) => {
    const [ timeLeft, setTimeLeft ] = useState<number>()

    // set timeout once received
    useEffect(() => {
        // only set timeLeft if props.timeout was properly communicated
        if(props.timeout > 0) {
            setTimeLeft(Math.round((props.timeout - Date.now()) / 1000))
        }
    }, [props.timeout])

    // clock ticking
    useEffect(() => {
        const timer = setTimeout(() => {
            if(timeLeft && timeLeft > 0 && !props.solveMode) {
                setTimeLeft(timeLeft! - 1);
            }
        }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [timeLeft, props.solveMode])

    return (
        <Box>
            <VStack spacing={0}>
                <Box
                    fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                    fontWeight={timeLeft! <= 5 ? "bold" : "light"}
                    color={timeLeft! <= 5 ? "haystack.500" : ""}
                    minW={14}
                    textAlign="center"
                >{timeLeft}s</Box>
                <Box
                    fontSize={{ base: "2xs", sm: "xs" }}
                    fontWeight="bold"
                    color="gray.500"
                >LEFT</Box>
            </VStack>
        </Box>
    )
}