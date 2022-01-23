import React, {useState} from "react";
import {Marker, useMapEvents} from "react-leaflet";
import L, {LatLngExpression} from "leaflet";
import {IGuessMarkerProps} from "./IGuessMarkerProps";

export const GuessMarker = (props: IGuessMarkerProps) => {
    const [ location, setLocation ] = useState({})

    useMapEvents({
        click(loc: any) {
            // only processes clicks during guessing
            if(loc && props.guessingActive) {
                // put guessed location in state
                setLocation({ lat: loc.latlng.lat, lng: loc.latlng.lng })
                // send guess to server
                props.sendMessage("guess/submit", { latLng: loc.latlng });
            }
        }
    })

    const guessIcon = new L.DivIcon({
        className: `pin pin-${props.player.color} pin-user`,
        iconSize: [30, 44],
        iconAnchor: [15, 44],
        html: `<span>${props.player.name?.slice(0, 1).toUpperCase()}</span>`
    })

    return Object.keys(location).length === 0 ? null : (
        <Marker
            position={location as LatLngExpression}
            icon={guessIcon}
        />
    )
}