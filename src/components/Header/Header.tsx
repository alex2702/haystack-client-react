import React from "react";
import {Box} from "@chakra-ui/react";
import "./Header.scss";

export const Header = () => {
    return (
        <Box position="relative" display="flex" justifyContent="center" mb={{ base: 1, md: 4 }}>
            <Box
                display="flex"
                flex="0 1 auto"
            >
                <svg className="hs-header" viewBox="0 0 225 50" preserveAspectRatio="xMidYMid meet">
                    <text className="bottom" x="10" y="40">Haystack</text>
                    <text className="center" x="10" y="40">Haystack</text>
                    <text className="top" x="10" y="40">Haystack</text>
                </svg>
            </Box>
        </Box>
    );
}