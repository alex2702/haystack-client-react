import React, {useCallback, useEffect, useRef, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {useGame} from "../../context/GameContext";
import {RoomCreate} from "../../partials/RoomCreate/RoomCreate";
import {Box, Grid, GridItem, SimpleGrid, useToast} from "@chakra-ui/react";
import {Player} from "../../models/Player";
import {Room} from "colyseus.js";
import {RoomJoin} from "../../partials/RoomJoin/RoomJoin";
import {RoomLobby} from "../../partials/RoomLobby/RoomLobby";
import {RoomGuess} from "../../partials/RoomGuess/RoomGuess";
import {RoomFinish} from "../../partials/RoomFinish/RoomFinish";
import {RoomDetails} from "../../partials/RoomDetails/RoomDetails";
import {RoomMembers} from "../../partials/RoomMembers/RoomMembers";
import {CountdownModal} from "../../components/CountdownModal/CountdownModal";

export const HaystackRoom = () => {
    const navigate = useNavigate()

    const { game, dispatchGame } = useGame()
    const [ countdownRunning, setCountdownRunning ] = useState(false)
    const [ solveModeActive, setSolveModeActive ] = useState(false)

    const toast = useToast({
        variant: "subtle",
        position: "bottom",
        duration: 10000,
        isClosable: true
    })

    const refUserIsAdmin = useRef(game.room?.state.players.get(game.room?.sessionId)?.admin)
    const refUserIsInGame = useRef(game.room?.state.players.get(game.room?.sessionId)?.inGame)
    const refRoomId = useRef(game.room?.id)
    const refSettingTimeLimit = useRef(game.settingTimeLimit)

    useEffect(() => {
        refUserIsAdmin.current = game.room?.state.players.get(game.room?.sessionId)?.admin
        refUserIsInGame.current = game.room?.state.players.get(game.room?.sessionId)?.inGame
        refRoomId.current = game.room?.id
        refSettingTimeLimit.current = game.settingTimeLimit
    });

    const setRoom = (r: Room) => {
        r.state.players.onAdd = onPlayerAdd
        r.state.players.onRemove = onPlayerRemove
        r.onStateChange.once((state) => { onInitialStateChange(state) })

        // set message handlers on room
        r.onMessage("settings/updated", (msg: any) => onSettingsUpdated(msg))
        r.onMessage("round/prepared", (msg: any) => onRoundPrepared())
        r.onMessage("round/started", (msg: any) => onRoundStarted())
        r.onMessage("round/completed", (msg: any) => onRoundCompleted())
        r.onMessage("scores/sent", (msg: any) => onScoresShow())
        r.onMessage("game/completed", (msg: any) => onGameCompleted())
        r.onMessage("game/cancelled", (msg: any) => onGameCancelled())
        r.onMessage("player/joined", (msg: any) => onPlayerJoined(msg))
        r.onMessage("player/left", (msg: any) => onPlayerLeft(msg))
        r.onMessage("player/rejoined", (msg: any) => onPlayerRejoined(msg))
        r.onMessage("player/newAdmin", (msg: any) => onNewAdmin())

        // save roomId and sessionId to localStorage for rejoining later
        localStorage.setItem("roomId", r.id);
        localStorage.setItem("sessionId", r.sessionId);

        dispatchGame({
            type:'setRoom',
            room: r
        })
    }

    const setAdmin = (value: boolean) => {
        dispatchGame({type: 'setAdmin', value: value})
    }

    const onPlayerAdd = (player: Player) => {
        // attach onChange listener
        player.onChange = (changes) => {
            dispatchGame({type: 'setPlayer', player: player})
        }

        // save to context
        dispatchGame({type: 'setPlayer', player: player})

        // force "onChange" to be called immediately
        player.triggerAll();
    }

    const onPlayerRemove = (player: Player) => {
        dispatchGame({type: 'removePlayer', player: player})

        // force "onChange" to be called immediately
        player.triggerAll();
    }

    const onInitialStateChange = (state: any) => {
        // put current room settings into local Game context
        dispatchGame({type: 'setSettings', settings: {
                settingRounds: state.settingRounds,
                settingLocationSet: state.settingLocationSet,
                settingTimeLimit: state.settingTimeLimit
            }})
    }

    const onSettingsUpdated = (v: any) => {
        dispatchGame({type: 'setSettings', settings: {
                settingRounds: v.settings.rounds,
                settingLocationSet: v.settings.locationSet,
                settingTimeLimit: v.settings.timeLimit
            }})
    }

    const onRoundPrepared = () => {
        setSolveModeActive(false)
        incrementRound()
        setCountdownRunning(true)
    }

    const onRoundStarted = () => {
        if(refUserIsInGame.current) {
            navigate('/room/${refRoomId}/guess')
            dispatchGame({ type: 'setTimeout', timeout: Date.now() + refSettingTimeLimit.current * 1000})
        }
    }

    const onRoundCompleted = () => {
        if(refUserIsInGame.current) {
            setSolveModeActive(true)
        }
    }

    const onScoresShow = () => {
        if(refUserIsInGame.current) {
            navigate('/room/${refRoomId}/finish')
        }
    }

    const onGameCompleted = () => {
        setSolveModeActive(false)
        dispatchGame({type: 'resetRounds'})
        navigate('/room/${refRoomId}/lobby')
    }

    const onGameCancelled = () => {
        setSolveModeActive(false)
        dispatchGame({type: 'resetRounds'})
        navigate('/room/${refRoomId}/lobby')
        toast({
            title: "Game Cancelled",
            status: "error"
        })
    }

    const onPlayerJoined = (message: any) => {
        toast({
            title: "New player!",
            description: `${message.playerName} has joined.`,
            status: "success"
        })
    }

    const onPlayerLeft = (message: any) => {
        toast({
            title: `${message.playerName} has left.`,
            status: "error"
        })
    }

    const onPlayerRejoined = (message: any) => {
        toast({
            title: `${message.playerName} has rejoined.`,
            status: "success"
        })
    }

    const onNewAdmin = () => {
        toast({
            title: "You are now the admin.",
            status: "info"
        })
    }

    const incrementRound = () => {
        dispatchGame({type:'incrementRound'})
    }

    const setSettingRounds = (v: number) => {
        dispatchGame({type:'setSettingRounds', settingRounds: v})
    }

    const setSettingLocationSet = (v: string) => {
        dispatchGame({type:'setSettingLocationSet', settingLocationSet: v})
    }

    const setSettingTimeLimit = (v: number) => {
        dispatchGame({type:'setSettingTimeLimit', settingTimeLimit: v})
    }

    const startRound = () => {
        setCountdownRunning(false)
        if(game.room?.state.players.get(game.room?.sessionId)?.admin && game.room?.state.players.get(game.room?.sessionId)?.inGame) {
            sendMessage("round/start", {});
        }
    }

    const sendMessage = (type: string, body: any) => {
        game.room?.send(type, body);
    }

    const finishRound = () => {
        if(game.room?.state.players.get(game.room?.sessionId)?.admin && game.room?.state.players.get(game.room?.sessionId)?.inGame) {
            sendMessage("round/finish", {});
        }
    }

    const cancelGame = useCallback(() => {
        if(game.room?.state.players.get(game.room?.sessionId)?.admin && game.room?.state.players.get(game.room?.sessionId)?.inGame) {
            sendMessage("game/cancel", {});
        }
    }, [game.room?.sessionId, game.room?.state.players, sendMessage])

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/" />} />
            <Route path="/create" element={
                <HaystackCard title="Create" width={{ base: "full", md: "xl" }}>
                    <RoomCreate
                        client={game.client}
                        setRoom={setRoom}
                        setAdmin={setAdmin}
                    />
                </HaystackCard>
            } />
            <Route path="/:roomId" element={
                <HaystackCard long title="Join" width={{ base: "full", md: "xl" }}>
                    <RoomJoin
                        client={game.client}
                        setRoom={setRoom}
                    />
                </HaystackCard>
            } />
            <Route path="/:roomId/*" element={
                <div>
                    <Grid templateRows="1" templateColumns="repeat(12, 1fr)" gap={{ base: 0, sm: 4 }}>
                        <GridItem rowSpan={1} colSpan={{ base: 12, xl: 8 }}>
                            <Routes>
                                <Route path="/lobby" element={
                                    <RoomLobby
                                        userIsAdmin={game.room?.state.players.get(game.room?.sessionId)?.admin}
                                        userIsInGame={game.room?.state.players.get(game.room?.sessionId)?.inGame}
                                        gameActive={game.room?.state.gameActive}
                                        settingRounds={game.settingRounds}
                                        settingLocationSet={game.settingLocationSet}
                                        settingLocationSetAvailable={game.settingLocationSetAvailable}
                                        settingTimeLimit={game.settingTimeLimit}
                                        sendMessage={sendMessage}
                                        setSettingRounds={setSettingRounds}
                                        setSettingLocationSet={setSettingLocationSet}
                                        setSettingTimeLimit={setSettingTimeLimit}
                                    />
                                } />
                                <Route path="/guess" element={
                                    <RoomGuess
                                        players={game.room?.state.players}
                                        player={game.room?.state.players.get(game.room?.sessionId)}
                                        guessingActive={game.room?.state.guessingActive}
                                        userIsAdmin={game.room?.state.players.get(game.room?.sessionId)?.admin}
                                        target={game.room?.state.currentTarget}
                                        targetLat={game.room?.state.lastTargetLat || 0}
                                        targetLng={game.room?.state.lastTargetLng || 0}
                                        sendMessage={sendMessage}
                                        solveMode={solveModeActive}
                                        currentRound={game.currentRound}
                                        settingRounds={game.settingRounds}
                                        timeout={game.timeout}
                                    />
                                } />
                                <Route path="/finish" element={
                                    <RoomFinish
                                        players={game.room?.state.players}
                                        userIsAdmin={game.room?.state.players.get(game.room?.sessionId)?.admin}
                                        currentRound={game.currentRound}
                                        settingRounds={game.settingRounds}
                                        finishRound={finishRound}
                                    />
                                } />
                            </Routes>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={{ base: 12, xl: 4 }}>
                            <SimpleGrid columns={{ base: 1, sm: 2, xl: 1 }} spacing={{ base: 0, sm: 4}}>
                                <Box>
                                    <RoomDetails
                                        roomId={game.room?.id || ""}
                                        userIsAdmin={game.room?.state.players.get(game.room?.sessionId)?.admin}
                                        cancelGame={cancelGame}
                                        gameActive={game.room?.state.gameActive}
                                        settingRounds={game.settingRounds}
                                        settingLocationSet={game.settingLocationSet}
                                        settingLocationSetAvailable={game.settingLocationSetAvailable}
                                        settingTimeLimit={game.settingTimeLimit}
                                    />
                                </Box>
                                <Box>
                                    <RoomMembers
                                        gameActive={game.room?.state.gameActive}
                                        players={game.players}
                                        solveMode={solveModeActive}
                                    />
                                </Box>
                            </SimpleGrid>
                        </GridItem>
                    </Grid>
                    {countdownRunning && <CountdownModal currentRound={game.currentRound} onCountdownUp={startRound} />}
                </div>
            } />
        </Routes>
    )
}