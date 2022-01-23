import React from "react";
import {LocationSet} from "../../models/LocationSet";

export interface IRoomDetailsProps {
    roomId: string
    userIsAdmin: boolean
    cancelGame: any
    gameActive: boolean
    settingRounds: number,
    settingLocationSet: string
    settingLocationSetAvailable: Map<string, LocationSet>,
    settingTimeLimit: number
}