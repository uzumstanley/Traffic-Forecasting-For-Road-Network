import {useQuery} from "@tanstack/react-query";
import APIClient from "@/services/apiClient.ts";
import useLocationQueryStore from "@/hooks/useLocationStore.ts";
import ms from 'ms';
import {Option} from "@/constants/constants.ts";

const apiClient = new APIClient<Option[]>("/cities/search");


const UseSearchTextTo = () => {
    const searchTextTo = useLocationQueryStore(s => s.searchTextTo);

    return useQuery<Option[]>({
        queryKey: ['searchTo', searchTextTo],
        queryFn: () => {
            if (searchTextTo && searchTextTo.length > 2) {
                return apiClient.getAll({
                    params: {
                        text: searchTextTo
                    }
                });
            }
            return Promise.resolve([]); // Return an empty array if condition not met
        },
        staleTime: ms('60d'),
        retry: 5,
        enabled: !!searchTextTo && searchTextTo.length > 2 // Ensure this is a boolean
    });
};

export default UseSearchTextTo;
