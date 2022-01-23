import {Player} from "../../models/Player";

export interface IRoomFinishProps  {
    players: Map<string, Player>
    userIsAdmin: boolean
    currentRound: number
    settingRounds: number
    finishRound: any
}