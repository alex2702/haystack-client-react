import {Box, Button, Stack, StackDivider, VStack} from "@chakra-ui/react";
import {MapContainer} from "react-leaflet";
import {LatLngBounds} from "leaflet";
import React from "react";
import {HaystackMap} from "./HaystackMap";
import {IHaystackMapContainerProps} from "./IHaystackMapContainerProps";
import {HaystackActions} from "../Actions/HaystackActions";
import {MapTimer} from "./MapTimer";

const HaystackMapContainer = (props: IHaystackMapContainerProps) => {
    const adminButtonProps = {
        admin: "true"
    }

    function showScores() {
        props.sendMessage("scores/send", {})
    }

    return (
        <>
            <Box position="absolute" w="100%" zIndex="999" p={3} className="hs-map-header">
                <Box position="relative" display="flex" justifyContent="flex-start">
                    <Box
                        bg="white"
                        boxShadow="sm"
                        rounded="md"
                        px={{ base: 2, sm: 3, md: 4 }}
                        py={{ base: 1, sm: 2 }}
                        display="flex"
                        flex="0 1 auto"
                        position="absolute"
                        left="50%"
                        transform="translateX(-50%)"
                        fontSize={{ base: "sm", sm: "md", md: "lg" }}
                        maxWidth={{ base: "60%", sm: "45%" }}
                    >
                        {props.target}
                    </Box>

                    <Box
                        bg="white"
                        boxShadow="sm"
                        rounded="md"
                        px={{ base: 2, sm: 3, md: 4 }}
                        py={{ base: 1, sm: 2 }}
                        display="flex"
                        flex="0 1 auto"
                        ml="auto"
                    >
                        <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: "4px", sm: "8px", md: "12px" }} divider={<StackDivider borderColor="gray.200" />}>
                            {!props.solveMode && /* do not show clock when solving */
                                <MapTimer timeout={props.timeout} />
                            }
                            <Box>
                                <VStack spacing={0}>
                                    <Box
                                        fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                                        fontWeight="light"
                                        minW={14}
                                        textAlign="center"
                                    >{props.currentRound}/{props.settingRounds}</Box>
                                    <Box
                                        fontSize={{ base: "2xs", sm: "xs" }}
                                        fontWeight="bold"
                                        color="gray.500"
                                    >ROUND</Box>
                                </VStack>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>

            <Box w="full" h={{ base: "lg", md: "xl"}}>
                <MapContainer
                    center={[0, 0]}
                    zoom={3}
                    minZoom={2}
                    maxZoom={6}
                    maxBoundsViscosity={1.0}
                    maxBounds={new LatLngBounds([[-90, -1800], [90, 1800]])}
                >
                    <HaystackMap
                        player={props.player}
                        guessingActive={props.guessingActive}
                        solveMode={props.solveMode}
                        target={props.target}
                        targetLat={props.targetLat}
                        targetLng={props.targetLng}
                        players={props.players}
                        sendMessage={props.sendMessage}
                    />
                </MapContainer>
            </Box>

            {props.solveMode &&
                <HaystackActions userIsAdmin={props.userIsAdmin} floating>
                    <Button onClick={showScores} {...adminButtonProps}>Check Scores</Button>
                    <Button disabled>Waiting for Admin</Button>
                </HaystackActions>
            }
        </>
    )
}

HaystackMapContainer.whyDidYouRender = true
export { HaystackMapContainer }