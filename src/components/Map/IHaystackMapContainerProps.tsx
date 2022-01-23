import {Player} from "../../models/Player";

export interface IHaystackMapContainerProps  {
    target: string
    targetLat: number
    targetLng: number
    solveMode: boolean
    guessingActive: boolean
    players: Map<string, Player>
    player: Player
    userIsAdmin: boolean
    sendMessage: any
    currentRound: number
    settingRounds: number
    timeout: number
}