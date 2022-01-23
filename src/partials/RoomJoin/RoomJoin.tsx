import React, {useState} from "react";
import {IRoomJoinProps} from "./IRoomJoinProps";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {Button, FormControl, FormLabel, Input, useToast, VStack} from "@chakra-ui/react";
import {joinRoom} from "../../utilities/api";

export const RoomJoin = (props: IRoomJoinProps) => {
    const navigate = useNavigate()
    const [ playerName, setPlayerName ] = useState(localStorage.getItem("playerName") || "");

    const { pathname } = useLocation()
    const matchRoom = matchPath({ path: "/room/:roomId" }, pathname)

    const toast = useToast({
        variant: "subtle",
        position: "bottom",
        duration: 10000,
        isClosable: true
    })

    const handleJoinResponse = (res: any) => {
        if (res.message === "joined" || res.message === "rejoined" || res.message === "joinedWithNewUser") {
            props.setRoom(res.room!)

            if (res.message === "joined") {
                toast({
                    title: "Joined successfully.",
                    status: "success"
                })
            } else if (res.message === "rejoined") {
                toast({
                    title: "Rejoined successfully.",
                    status: "success"
                })
            } else if (res.message === "joinedWithNewUser") {
                toast({
                    title: "Joined as a new user.",
                    description: "Your previous session has expired.",
                    status: "warning"
                })
            }

            // move to lobby view
            navigate(`/room/${res.room.id}/lobby`)

            // change URL in browser
            window.history.pushState("", "", `/room/${res.room.id}`);
        } else if (res.message === "roomNotFound") {
            toast({
                title: "Could not join.",
                description: "Sorry, this room was not found.",
                status: "error"
            })
        } else if (res.message === "usernameTaken") {
            toast({
                title: "This name is taken.",
                description: "Please choose a different one and try again.",
                status: "error"
            })
        } else {
            toast({
                title: "Could not join room.",
                description: "Unknown error.",
                status: "error"
            })
        }
    }

    const handleSubmit = (e: any) => {
        if (playerName && playerName.length > 2 && matchRoom && matchRoom.params.roomId && props.client) {
            // save name to localStorage
            localStorage.setItem("playerName", playerName);

            // determine if user is attempting a rejoin
            let sessionIdFromLocalStorage = localStorage.getItem("sessionId");
            let roomIdFromLocalStorage = localStorage.getItem("roomId");
            let rejoin = (sessionIdFromLocalStorage && roomIdFromLocalStorage &&
                roomIdFromLocalStorage === matchRoom.params.roomId)

            joinRoom(
                rejoin || false,
                matchRoom.params.roomId,
                sessionIdFromLocalStorage || "",
                playerName,
                props.client
            ).then(handleJoinResponse);
        }

        e.preventDefault()
    }

    const handleNameChange = (e: any) => {
        setPlayerName(e.target.value)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={playerName.length < 3} textAlign="center" mt={4}>
                    <VStack spacing="12px">
                        <FormLabel textAlign="center">Enter your name</FormLabel>
                        <Input
                            type="text"
                            onChange={handleNameChange}
                            value={playerName}
                            w="80%" />
                        <Button
                            mt={4}
                            type="submit"
                            isDisabled={playerName.length < 3}
                        >Join</Button>
                    </VStack>
                </FormControl>
            </form>
        </>
    );
}