import {Player} from "../../models/Player";

export interface IRoomGuessProps {
    players: Map<string, Player>
    player: Player
    guessingActive: boolean
    userIsAdmin: boolean
    target: string
    targetLat: number
    targetLng: number
    sendMessage: any
    solveMode: boolean
    currentRound: number
    settingRounds: number
    timeout: number
}