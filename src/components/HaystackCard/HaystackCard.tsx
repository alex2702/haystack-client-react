import React from "react";
import './HaystackCard.scss';
import {Box} from "@chakra-ui/react";

export const HaystackCard = (props: any) => {
    return (
        <>
            <Box display="flex" flexDir="column" w={props.width || "100%"} h={props.height || "auto"} alignSelf="center">
                {props.title &&
                    <Box zIndex="docked" pl={{ base: 1, md: 2}}>
                        <svg className="hs-card-header">
                            <text className="bottom" x="10" y="40">{props.title}</text>
                            <text className="top" x="10" y="40">{props.title}</text>
                        </svg>
                    </Box>
                }
                <Box
                    className={`hs-card-body ${props.borderless ? "borderless" : ""} ${props.title ? "" : "titleless"}`}
                    bg="white"
                    zIndex="base"
                    borderRadius="lg"
                    px={{ base: 3, md: 5 }}
                    pb={{ base: 3, md: 5 }}
                    pt={{ base: 5, md: 8 }}
                    position="relative"
                    display="flex"
                    flexDir="column"
                    h={props.height || ""}
                >
                    {props.children}
                </Box>
            </Box>
        </>
    )
}