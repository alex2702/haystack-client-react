import React from "react";
import {Button} from "@chakra-ui/react";
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {useNavigate} from 'react-router-dom';

export const HomeActions = () => {
    const navigate = useNavigate()

    function createGame() {
        navigate('/room/create')
    }

    return (
        <>
            <HaystackCard title="Create a New Game" width={{ base: "100%", md: "xl" }} height="3xs">
                <Button onClick={createGame} margin="auto">Create</Button>
            </HaystackCard>
        </>
    )
}