import React, {useRef} from "react";
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {Scores} from "../../components/Scores/Scores";
import {Button} from "@chakra-ui/react";
import {HaystackActions} from "../../components/Actions/HaystackActions";
import {IRoomFinishProps} from "./IRoomFinishProps";

export const RoomFinish = (props: IRoomFinishProps) => {
    const adminButtonProps = {
        admin: "true"
    }

    const refCurrentRound = useRef(props.currentRound)

    return (
        <>
            <HaystackCard title={refCurrentRound.current === props.settingRounds ?
                "Final Scores" : `Scores after Round ${refCurrentRound.current}`}>
                <Scores players={props.players}/>
                <HaystackActions userIsAdmin={props.userIsAdmin || false}>
                    <Button onClick={props.finishRound} {...adminButtonProps}>
                        {refCurrentRound.current === props.settingRounds ?
                            "Finish Game" : `Start Round ${refCurrentRound.current+1}`}
                    </Button>
                    <Button disabled>Waiting for Admin</Button>
                </HaystackActions>
            </HaystackCard>
        </>
    );
}