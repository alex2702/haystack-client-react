import {LocationSet} from "../../models/LocationSet";

export interface ISettingLocationSetProps {
    userIsAdmin: boolean
    defaultValue: string
    locationSets: Map<string, LocationSet>
    onSettingChange: any
    value: string
}