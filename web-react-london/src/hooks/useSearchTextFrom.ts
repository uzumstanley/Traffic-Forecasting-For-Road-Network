import {useQuery} from "@tanstack/react-query";
import APIClient from "@/services/apiClient.ts";
import useLocationQueryStore from "@/hooks/useLocationStore.ts";
import ms from 'ms';
import {Option} from "@/constants/constants.ts";

const apiClient = new APIClient<Option[]>("/cities/search");


const UseSearchTextFrom = () => {
    const searchTextFrom = useLocationQueryStore(s => s.searchTextFrom);

    return useQuery<Option[]>({
        queryKey: ['searchFrom', searchTextFrom],
        queryFn: () => {
            if (searchTextFrom && searchTextFrom.length >= 2) {
                return apiClient.getAll({
                    params: {
                        text: searchTextFrom
                    }
                });
            }
            return Promise.resolve([]); // Return an empty array if condition not met
        },
        staleTime: ms('60d'),
        retry: 5,
        enabled: !!searchTextFrom && searchTextFrom.length >= 2 // Ensure this is a boolean
    });
};

export default UseSearchTextFrom;
