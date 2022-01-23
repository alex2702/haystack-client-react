import {Player} from "../../models/Player";

export interface IGuessMarkerProps {
    guessingActive: boolean
    player: Player
    sendMessage: any
}