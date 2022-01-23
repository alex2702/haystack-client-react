import React, {useEffect, useRef, useState} from "react";
import {IRoomLobbyProps} from "./IRoomLobbyProps";
import {
    Box,
    Button, Grid, GridItem,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from "@chakra-ui/react";
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {HaystackActions} from "../../components/Actions/HaystackActions";
import {HaystackHeading} from "../../components/HaystackHeading/HaystackHeading";
import {SettingLocationSet} from "../../components/SettingLocationSet/SettingLocationSet";
import debounce from 'lodash.debounce';

export const RoomLobby = (props: IRoomLobbyProps) => {
    const [ settingRounds, setSettingRounds ] = useState(props.settingRounds)
    const [ settingTimeLimit, setSettingTimeLimit ] = useState(props.settingTimeLimit)

    const adminButtonProps = {
        admin: "true"
    }

    useEffect(() => {
        setSettingRounds(props.settingRounds)
        setSettingTimeLimit(props.settingTimeLimit)
    }, [props]);

    const debouncedSaveRounds = useRef(
        debounce((value: any) => {
            props.setSettingRounds(value)
            props.sendMessage("settings/update", {
                settings: {
                    rounds: value
                }
            })
        }, 250)
    ).current;

    const debouncedSaveTimeLimit = useRef(
        debounce((value: any) => {
            props.setSettingTimeLimit(value)
            props.sendMessage("settings/update", {
                settings: {
                    timeLimit: value
                }
            })
        }, 250)
    ).current;

    const handleSettingsChangeRounds = (value: any) => {
        if(props.userIsAdmin) {
            setSettingRounds(value)
            debouncedSaveRounds(value)
        }
    }

    const handleSettingsChangeLocationSet = (value: any) => {
        if(props.userIsAdmin) {
            props.setSettingLocationSet(value)
            props.sendMessage("settings/update", {
                settings: {
                    locationSet: value
                }
            });
        }
    }

    const handleSettingsChangeTimeLimit = (value: any) => {
        if(props.userIsAdmin) {
            setSettingTimeLimit(value)
            debouncedSaveTimeLimit(value)
        }
    }

    const startGame = () => {
        if(props.userIsAdmin) {
            props.sendMessage("game/start", {
                settings: {
                    rounds: props.settingRounds,
                    locationSet: props.settingLocationSet,
                    timeLimit: props.settingTimeLimit
                }
            })
        }
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            {props.gameActive && !props.userIsInGame &&
                <HaystackCard title="Game in Progress">
                    <Box
                        fontWeight={300}
                        fontSize={{ base: "lg", md: "2xl" }}
                        px={2}
                        py={4}
                    >
                        There is currently a game in progress.
                    </Box>
                </HaystackCard>
            }

            {(!props.gameActive || props.userIsInGame) &&
                <HaystackCard title="Settings">
                    <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(3, 1fr)"
                    >
                        <GridItem
                            colSpan={{ base: 3, sm: 3 }}
                        >
                            <HaystackHeading display="flex" alignItems="center">Rounds</HaystackHeading>
                        </GridItem>
                        <GridItem
                            colSpan={{ base: 3, sm: 1 }}
                        >
                            {settingRounds} Rounds
                        </GridItem>
                        <GridItem
                            colSpan={{ base: 3, sm: 2 }}
                        >
                            {props.userIsAdmin &&
                                <Slider
                                    aria-label="Number of rounds to play"
                                    defaultValue={settingRounds}
                                    min={1} max={20} step={1}
                                    minH="8"
                                    onChange={handleSettingsChangeRounds}>
                                    <SliderTrack bg="haystack.100">
                                        <SliderFilledTrack bg="haystack.600" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={4} />
                                </Slider>
                            }
                            {!props.userIsAdmin &&
                                <Slider
                                    aria-label="Number of rounds to play"
                                    defaultValue={settingRounds}
                                    value={settingRounds}
                                    min={1} max={20} step={1}
                                    minH="8"
                                    isDisabled={true}
                                    onChange={handleSettingsChangeRounds}>
                                    <SliderTrack bg="haystack.100">
                                        <SliderFilledTrack bg="haystack.600" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={4} />
                                </Slider>
                            }
                        </GridItem>
                    </Grid>

                    <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(3, 1fr)"
                    >
                        <GridItem
                            colSpan={{ base: 3, sm: 3 }}
                        >
                            <HaystackHeading display="flex" alignItems="center">Time Limit</HaystackHeading>
                        </GridItem>
                        <GridItem
                            colSpan={{ base: 3, sm: 1 }}
                        >
                            {settingTimeLimit} seconds
                        </GridItem>
                        <GridItem
                            colSpan={{ base: 3, sm: 2 }}
                        >
                            {props.userIsAdmin &&
                                <Slider
                                    aria-label="Time limit per round in seconds"
                                    defaultValue={settingTimeLimit}
                                    min={5} max={90} step={5}
                                    minH="8"
                                    onChange={handleSettingsChangeTimeLimit}>
                                    <SliderTrack bg="haystack.100">
                                        <SliderFilledTrack bg="haystack.600" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={4} />
                                </Slider>
                            }
                            {!props.userIsAdmin &&
                                <Slider
                                    aria-label="Time limit per round in seconds"
                                    defaultValue={settingTimeLimit}
                                    value={settingTimeLimit}
                                    min={5} max={90} step={5}
                                    minH="8"
                                    isDisabled={true}
                                    onChange={handleSettingsChangeTimeLimit}>
                                    <SliderTrack bg="haystack.100">
                                        <SliderFilledTrack bg="haystack.600" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={4} />
                                </Slider>
                            }
                        </GridItem>
                    </Grid>

                    <HaystackHeading mt={4} mb={2}>Game Mode</HaystackHeading>
                    <SettingLocationSet
                        userIsAdmin={props.userIsAdmin}
                        value={props.settingLocationSet}
                        defaultValue={props.settingLocationSet}
                        locationSets={props.settingLocationSetAvailable}
                        onSettingChange={handleSettingsChangeLocationSet} />

                    <HaystackActions userIsAdmin={props.userIsAdmin}>
                        <Button onClick={startGame} {...adminButtonProps}>Start Game</Button>
                        <Button disabled>Waiting for Admin</Button>
                    </HaystackActions>
                </HaystackCard>
            }
        </>
    );
}