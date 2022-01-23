import React from "react";
import {IRoomGuessProps} from "./IRoomGuessProps";
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {HaystackMapContainer} from "../../components/Map/HaystackMapContainer";
import "leaflet";
import "leaflet/dist/leaflet.css";

export const RoomGuess = (props: IRoomGuessProps) => {
    return (
        <HaystackCard borderless position="relative">
            <HaystackMapContainer
                {...props}
                target={props.target}
                targetLat={props.targetLat}
                targetLng={props.targetLng}
                solveMode={props.solveMode}
                guessingActive={props.guessingActive}
                players={props.players}
                player={props.player}
                userIsAdmin={props.userIsAdmin}
                sendMessage={props.sendMessage}
                currentRound={props.currentRound}
                settingRounds={props.settingRounds}
                timeout={props.timeout}
            />
        </HaystackCard>
    );
}