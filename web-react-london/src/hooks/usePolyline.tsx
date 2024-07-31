import useRoute from "@/hooks/useRoute.ts";
import {LatLngExpression} from "leaflet";
import {useEffect} from "react";
import toast from "react-hot-toast";
import parsePoint from "@/utils/utils.ts";

const usePolyline = () => {
    const {data, isLoading, error} = useRoute();

    let polylineCoordinates: LatLngExpression[] = [];
    let lastCoordinate: LatLngExpression | null = null;
    let firstCoordinate: LatLngExpression | null = null;
    let roundedDistance: number | null = null;

    useEffect(() => {
        if (error) {
            toast.error("Route not found! Please try again");
        }
    }, [error]);

    if (data && data?.paths) {
        polylineCoordinates = data.paths.map((point) => parsePoint(point.geom_geographic)).filter(Boolean) as LatLngExpression[];
        lastCoordinate = polylineCoordinates.length > 0 ? polylineCoordinates[polylineCoordinates.length - 1] : null;
        firstCoordinate = polylineCoordinates.length > 0 ? polylineCoordinates[0] : null;
        roundedDistance = data.distance ? Math.round(data.distance) : null;
    }

    return {polylineCoordinates, isLoading, roundedDistance, firstCoordinate, lastCoordinate};
};

export default usePolyline;
