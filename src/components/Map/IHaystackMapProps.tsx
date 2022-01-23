import {Player} from "../../models/Player";

export interface IHaystackMapProps {
    target: string
    targetLat: number
    targetLng: number
    solveMode: boolean
    guessingActive: boolean
    players: Map<string, Player>
    player: Player
    sendMessage: any
}