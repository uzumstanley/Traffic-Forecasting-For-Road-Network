import {useEffect, useState} from "react";
import {LayersControl, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import Sidebar from "../Sidebar/Sidebar.tsx";
import {BounceLoader} from "react-spinners";
import usePolyline from "@/hooks/usePolyline.tsx";
import RenderPolyline from "@/components/RenderPolyline.tsx";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import ClickMarker from "@/components/ClickMarker.tsx";
import Searchbar from "@/components/Searchbar.tsx";
import {markerIconGreen} from "@/constants/constants.ts";
import useLocationQueryStore from "@/hooks/useLocationStore.ts";
import parsePoint from "@/utils/utils.ts";

const FlyToLocation = ({location}) => {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.flyTo(location, 20);
        }
    }, [location, map]);

    return null;
};

const MapView = () => {
    const location = useLocationQueryStore((s) => s.location);
    const locationQuery = useLocationQueryStore((s) => s.locationQuery);
    const {polylineCoordinates, isLoading, roundedDistance, firstCoordinate, lastCoordinate} = usePolyline();
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
        };

        const handleOnline = () => {
            setIsOffline(false);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    useEffect(() => {
        if (isOffline) {
            toast.error("It seems you're offline");
        }
    }, [isOffline]);

    const {BaseLayer} = LayersControl;

    const parsedLocation = location ? parsePoint(location.geom) : null;

    return (
        <div className="relative">
            <Searchbar/>
            <Sidebar position="left" theme="light"/>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-[1000] bg-white bg-opacity-75">
                    <BounceLoader size={50} color={"#4F6F52"} loading={loading}/>
                </div>
            )}

            <MapContainer
                center={[51.5072, 0.1276]}
                zoom={15}
                style={{height: "100vh", width: "100%"}}
                whenReady={() => setLoading(false)}
            >
                <LayersControl>
                    <BaseLayer checked name="Satellite View">
                        <TileLayer
                            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            maxZoom={20}
                            subdomains={["mt1", "mt2", "mt3"]}
                        />
                    </BaseLayer>

                    <BaseLayer name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>

                    {parsedLocation && !locationQuery.from && !locationQuery.to && (
                        <>
                            <FlyToLocation location={parsedLocation}/>
                            <Marker icon={markerIconGreen} draggable position={parsedLocation}>
                                <Popup>{location?.name}</Popup>
                            </Marker>
                        </>
                    )}

                    {polylineCoordinates.length > 0 && (
                        <>
                            <RenderPolyline
                                polyline={polylineCoordinates}
                                firstCoordinate={firstCoordinate}
                                lastCoordinate={lastCoordinate}
                                estimatedDistance={roundedDistance}
                            />

                        </>
                    )}

                    <ClickMarker firstCoordinate={firstCoordinate}/>
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default MapView;
