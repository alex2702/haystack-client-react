import {Player} from "../../models/Player";
import {LatLng} from "leaflet";

export interface ISolveMarkersProps {
    onDone(markers: Array<LatLng>): any
    target: string
    targetLat: number
    targetLng: number
    players: Map<string, Player>
}