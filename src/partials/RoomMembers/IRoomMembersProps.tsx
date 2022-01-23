import {Player} from "../../models/Player";

export interface IRoomMembersProps {
    players: Map<string, Player>
    gameActive: boolean
    solveMode: boolean
}