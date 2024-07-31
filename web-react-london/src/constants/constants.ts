import L from "leaflet";
import marker from "@/assets/location.svg";
import markerGreen from "@/assets/location_green.png";

export const UserLocation = "My Location";


export const markerIconRed = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});

export const markerIconGreen = new L.Icon({
    iconUrl: markerGreen,
    iconRetinaUrl: markerGreen,
    popupAnchor: [-0, -0],
    iconSize: [32, 32],

});

export interface Option {
    id: string;
    name: string;
    geom: string;
}
