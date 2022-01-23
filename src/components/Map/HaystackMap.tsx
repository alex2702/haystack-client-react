import React, {useEffect} from "react";
import {TileLayer, useMap} from "react-leaflet";
import "./HaystackMap.scss";
import L, {LatLng} from "leaflet";
import {GuessMarker} from "./GuessMarker";
import {SolveMarkers} from "./SolveMarkers";
import {IHaystackMapProps} from "./IHaystackMapProps";

export const HaystackMap = (props: IHaystackMapProps) => {
    const map = useMap()

    // on load
    useEffect(() => {
        map.setZoom(map.getBoundsZoom([[-90, -180], [90, 180]], true))

        // enable crosshair cursor
        L.DomUtil.addClass(map.getContainer(),'crosshair-cursor-enabled');
    }, [])

    // callback function from SolveMarkers to make map settings for solve mode
    function setMapToSolveMode(markers: Array<LatLng>) {
        // higher max zoom
        map.setMaxZoom(10)

        // don't use crosshair cursor
        L.DomUtil.removeClass(map.getContainer(),'crosshair-cursor-enabled')

        // auto-zoom to new markers
        map.fitBounds(L.latLngBounds(markers), { padding: [25, 25] })
    }

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                maxZoom={10}
            />

            {!props.solveMode && <GuessMarker
                player={props.player}
                guessingActive={props.guessingActive}
                sendMessage={props.sendMessage} />
            }

            {props.solveMode &&
                <SolveMarkers
                    onDone={setMapToSolveMode}
                    target={props.target}
                    targetLat={props.targetLat}
                    targetLng={props.targetLng}
                    players={props.players}
                />
            }
        </>
    );
}