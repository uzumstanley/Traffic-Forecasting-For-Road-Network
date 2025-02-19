import {useEffect} from 'react';
import {Marker, Polyline, Popup, useMap} from 'react-leaflet';
import L, {LatLngExpression, LatLngLiteral, LatLngTuple} from 'leaflet';
import 'leaflet.smooth_marker_bouncing';
import {markerIconRed} from "@/constants/constants.ts";
import useLocationQueryStore from "@/hooks/useLocationStore.ts";

interface RenderPolylineProps {
    polyline: LatLngExpression[];
    lastCoordinate: LatLngLiteral | LatLngTuple | null;
    firstCoordinate: LatLngLiteral | LatLngTuple | null;
    estimatedDistance: number | null;
}

const polylineOptions = {color: "#077bd1db", weight: 9};
const dottedPolylineOptions = {color: "#077bd1db", weight: 4, dashArray: '5, 10'};

const RenderPolyline = ({polyline, firstCoordinate, lastCoordinate, estimatedDistance}: RenderPolylineProps) => {
    const locationQuery = useLocationQueryStore((s) => s.locationQuery);
    const setUserMarkerLocation = useLocationQueryStore((s) => s.setUserMarkerLocation);
    const userMarkerLocation = useLocationQueryStore((s) => s.userMarkerLocation);
    const map = useMap();
    const flyToDuration = 1.5;

    useEffect(() => {
        if (polyline.length > 0 && lastCoordinate) {
            setUserMarkerLocation(firstCoordinate);
            map.flyTo([lastCoordinate[0], lastCoordinate[1]], 20);
        }
    }, [lastCoordinate, firstCoordinate, map, polyline]);

    useEffect(() => {
        if (lastCoordinate) {
            map.eachLayer(async (layer) => {
                if (layer instanceof L.Marker) {
                    if (layer.getLatLng().equals(lastCoordinate)) {
                        await new Promise((r) => setTimeout(r, flyToDuration * 1000 + 100));
                        // @ts-ignore
                        layer.bounce();
                        // @ts-ignore
                        setTimeout(() => layer.stopBouncing(), 3000);
                    } else {
                        // @ts-ignore
                        layer.stopBouncing();
                    }
                }
            });
        }
    }, [lastCoordinate, map]);


    const getDottedPolyline = () => {
        if (firstCoordinate && userMarkerLocation) {
            return [firstCoordinate, userMarkerLocation];
        }
        return null;
    };

    return (
        <>
            {lastCoordinate && estimatedDistance !== null && (
                <Marker icon={markerIconRed} draggable position={lastCoordinate}>
                    <Popup>
                        Destination: {locationQuery?.to} <br/>
                        Distance: {estimatedDistance} meters.
                    </Popup>
                </Marker>
            )}

            <Polyline positions={polyline} pathOptions={polylineOptions}/>

            {getDottedPolyline() && (
                <Polyline positions={getDottedPolyline() as LatLngExpression[]} pathOptions={dottedPolylineOptions}/>
            )}
        </>
    );
};

export default RenderPolyline;
