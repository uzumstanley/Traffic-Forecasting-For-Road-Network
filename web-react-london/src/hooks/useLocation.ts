import {useQuery} from "@tanstack/react-query";
import APIClient from "@/services/apiClient.ts";
import useLocationQueryStore from "@/hooks/useLocationStore.ts";
import ms from 'ms';
import {Option} from "@/constants/constants.ts";

const apiClient = new APIClient<Option[]>("/cities/search");

const useLocation = () => {
    const location = useLocationQueryStore(s => s.location);

    return useQuery<Option[]>({
        queryKey: ['location', location],
        queryFn: () => {
            if (location && location.name && location.name.length >= 2) {
                return apiClient.getAll({
                    params: {
                        text: location.name
                    }
                });
            }
            return Promise.resolve([]); // Return an empty array if condition not met
        },
        staleTime: ms('60d'),
        retry: 3,
        enabled: !!location?.name && location.name.length >= 2 // Ensure this is a boolean
    });
};

export default useLocation;
