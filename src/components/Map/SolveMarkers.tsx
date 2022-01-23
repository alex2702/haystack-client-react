import React, {useEffect} from "react";
import L, {LatLng} from "leaflet";
import {Marker, Polyline, Tooltip} from "react-leaflet";
import {Player} from "../../models/Player";
import {getGreatCircleBearing, getDistance, computeDestinationPoint} from "geolib";
import {ISolveMarkersProps} from "./ISolveMarkersProps";

const SolveMarkers = (props: ISolveMarkersProps) => {
    // hold target + other players' marker and lines
    const allMarkersLatLng = new Array<LatLng>();
    const playerMarkers: any[] = []
    const playerLines: any[] = []

    // render target marker
    const targetLatLng = new LatLng(props.targetLat, props.targetLng).wrap()
    allMarkersLatLng.push(targetLatLng)
    const targetIcon = new L.DivIcon({
        className: 'pin pin-target',
        iconSize: [30, 44],
        iconAnchor: [15, 44]
    })
    const targetMarker = (
        <Marker
            position={targetLatLng}
            icon={targetIcon}
        >
            <Tooltip permanent>{props.target}</Tooltip>
        </Marker>
    )

    // all players' markers and lines to target
    props.players.forEach((player: Player) => {
        if(player.inGame && player.lastGuessLat && player.lastGuessLng) {
            const playerLatLng = wrapClosestToTarget(targetLatLng, new LatLng(player.lastGuessLat, player.lastGuessLng));
            allMarkersLatLng.push(playerLatLng)

            const playerMarkerIcon = new L.DivIcon({
                className: `pin pin-${player.color} pin-user`,
                iconSize: [30, 44],
                iconAnchor: [15, 44],
                html: `<span>${player.name!.slice(0, 1).toUpperCase()}</span>`
            })

            const playerMarker =
                <Marker
                    key={`marker-${player.id}`}
                    position={playerLatLng}
                    icon={playerMarkerIcon}
                >
                    <Tooltip permanent>{player.name}<br />{Math.round(player.lastDistance!).toLocaleString(window.navigator.language)} km</Tooltip>
                </Marker>

            playerMarkers.push(playerMarker)

            // calculate line
            // TODO put calculation in backend?
            // TODO distance calculation in backend seems off from geolib => check
            let bearing = getGreatCircleBearing(
                { latitude: player.lastGuessLat, longitude: player.lastGuessLng },
                { latitude: props.targetLat, longitude: props.targetLng }
            );

            let distance = getDistance(
                { latitude: player.lastGuessLat, longitude: player.lastGuessLng },
                { latitude: props.targetLat, longitude: props.targetLng }
            )

            let pointsForMap = []
            // push first point for line
            pointsForMap.push(playerLatLng)
            let iterations = 24
            for(let i = 1; i <= iterations; i++) {
                let point = computeDestinationPoint({ latitude: player.lastGuessLat, longitude: player.lastGuessLng }, distance * i/iterations, bearing)
                pointsForMap.push(new LatLng(point.latitude, point.longitude))
            }

            const playerLine =
                <Polyline
                    key={`line-${player.id}`}
                    positions={pointsForMap}
                    pathOptions={{
                        color: `#${player.color}`,
                        weight: 4,
                        opacity: 0.8
                    }} />

            playerLines.push(playerLine)
        }
    })

    // on load
    useEffect(() => {
        props.onDone(allMarkersLatLng)
    }, [])

    return (
        <>
            {targetMarker}
            {playerMarkers.map((playerMarker) => playerMarker)}
            {playerLines.map((playerLine) => playerLine)}
        </>
    )
}

function wrapClosestToTarget(target: LatLng, pointToWrap: LatLng): LatLng {
    const maxLng = target.lng + 180;
    const minLng = target.lng - 180;
    const maxLat = 90;
    const minLat = -90;
    const dLng = maxLng - minLng;
    const dLat = maxLat - minLat;

    const lng = pointToWrap.lng === maxLng ? pointToWrap.lng : ((pointToWrap.lng - minLng) % dLng + dLng) % dLng + minLng;
    const lat = pointToWrap.lat === maxLat ? pointToWrap.lat : ((pointToWrap.lat - minLat) % dLat + dLat) % dLat + minLat;

    return new LatLng(lat, lng);
}

SolveMarkers.whyDidYouRender = true
export { SolveMarkers }