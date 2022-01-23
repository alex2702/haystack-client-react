import {LocationSet} from "../../models/LocationSet";

export interface IRoomLobbyProps {
    userIsAdmin: boolean
    sendMessage: any
    setSettingRounds: any
    setSettingLocationSet: any
    setSettingTimeLimit: any
    settingRounds: number
    settingLocationSet: string
    settingLocationSetAvailable: Map<string, LocationSet>
    settingTimeLimit: number
    gameActive: boolean
    userIsInGame: boolean
}