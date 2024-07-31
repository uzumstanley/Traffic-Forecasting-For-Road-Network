import {create} from 'zustand'
import {LatLngExpression} from "leaflet";

export interface LocationQuery {
    from?: string;
    from_location?: string;
    to?: string;
}

export interface ILocation {
    name: string;
    geom: string;
    geom_geographic: string
}

export interface LocationQueryStore {
    locationQuery: LocationQuery;
    searchTextFrom?: string;
    searchTextTo?: string;
    location?: { name?: string, geom?: string }
    userMarkerLocation?: LatLngExpression | null;
    setFrom: (from: string) => void;
    setFromLocation: (from_location: string) => void;
    setTo: (to: string) => void;
    setSearchTextFrom: (searchText: string) => void;
    setSearchTextTo: (searchText: string) => void;
    setLocationName: (name?: string) => void;
    setLocationGeom: (geom?: string) => void;
    setUserMarkerLocation: (location: LatLngExpression | null) => void
}


const useLocationQueryStore = create<LocationQueryStore>((set) => ({
    locationQuery: {from: '', to: '', from_location: ''},
    searchTextFrom: '',
    searchTextTo: '',
    location: {name: '', geom: ''},
    userMarkerLocation: null,
    setFrom: (from: string) => set((store) => ({locationQuery: {...store.locationQuery, from}})),
    setFromLocation: (from_location?: string) => set((store) => ({
        locationQuery: {
            ...store.locationQuery,
            from_location
        }
    })),
    setTo: (to: string) => set((store) => ({locationQuery: {...store.locationQuery, to}})),
    setSearchTextFrom: (searchTextFrom: string) => set((store) => ({...store, searchTextFrom})),
    setSearchTextTo: (searchTextTo: string) => set((store) => ({...store, searchTextTo})),
    setLocationName: (name?: string) => set((store) => ({location: {...store.location, name}})),
    setLocationGeom: (geom?: string) => set((store) => ({location: {...store.location, geom}})),
    setUserMarkerLocation: (userMarkerLocation?: LatLngExpression | null) => set((store) => ({
        ...store,
        userMarkerLocation
    }))
}))

export default useLocationQueryStore;