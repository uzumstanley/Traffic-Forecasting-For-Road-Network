import { LatLngExpression } from "leaflet";
import parse from "wellknown";

export const parsePoint = (pointGeom: string | undefined): LatLngExpression | null => {
    const parsed = parse(pointGeom);
    if (parsed && parsed.type === "Point" && parsed.coordinates.length === 2) {
        // Swap from [longitude, latitude] to [latitude, longitude]
        const [longitude, latitude] = parsed.coordinates;
        return [latitude, longitude] as LatLngExpression;
    }
    return null;
};

export default parsePoint;
