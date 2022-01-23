import React, {useState} from "react";
import {IRoomCreateProps} from "./IRoomCreateProps";
import {Button, FormControl, FormLabel, Input, useToast, VStack} from "@chakra-ui/react";
import {createRoom} from "../../utilities/api";
import {matchPath, useLocation, useNavigate} from "react-router-dom";

export const RoomCreate = (props: IRoomCreateProps) => {
    const navigate = useNavigate()
    const [ playerName, setPlayerName ] = useState(localStorage.getItem("playerName") || "");

    const { pathname } = useLocation()
    const matchCreate = matchPath({ path: "/room/create" }, pathname)

    const toast = useToast({
        variant: "subtle",
        position: "bottom",
        duration: 10000,
        isClosable: true
    })

    const handleCreateResponse = (res: any) => {
        if(res.message === "created" && res.room) {
            props.setRoom(res.room)
            props.setAdmin(true)

            if (res.message === "created") {
                toast({
                    title: "Created",
                    description: "Game was created",
                    status: "success"
                })
            }

            // move to lobby view
            navigate(`/room/${res.room.id}/lobby`)

            // change URL in browser
            window.history.pushState("", "", `/room/${res.room.id}`);
        } else {
            toast({
                title: "Error",
                description: "Error while creating game",
                status: "error"
            })
        }
    }

    const handleSubmit = (e: any) => {
        if (playerName && playerName.length > 2 && matchCreate && props.client) {
            // save name to localStorage
            localStorage.setItem("playerName", playerName);

            createRoom(playerName, props.client).then(handleCreateResponse)
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
                        >Create</Button>
                    </VStack>
                </FormControl>
            </form>
        </>
    );
}