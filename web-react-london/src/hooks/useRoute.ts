import {useQuery} from "@tanstack/react-query";
import APIClient from "@/services/apiClient.ts";
import useLocationQueryStore from "@/hooks/useLocationStore.ts";

interface Route {
    distance: number;
    paths: { name: string, geom: string, geom_geographic: string }[];
}

const apiClient = new APIClient<Route>("/city/route");

const useRoute = () => {
    const locationQuery = useLocationQueryStore(s => s.locationQuery);

    const enabled = !!locationQuery.from && !!locationQuery.to && (locationQuery.from !== locationQuery.to);

    return useQuery<Route>(
        {
            queryKey: ['route', locationQuery],
            queryFn: () => {
                if (locationQuery.from && locationQuery.to) {
                    return apiClient.getAll({
                        params: {
                            from: locationQuery.from,
                            from_location: locationQuery.from_location,
                            to: locationQuery.to
                        }
                    });
                }
                return Promise.resolve({distance: 0, paths: []}); // Return an empty Route object if condition not met
            },
            staleTime: 0,
            retry: 2,
            enabled: enabled
        }
    );
};

export default useRoute;
