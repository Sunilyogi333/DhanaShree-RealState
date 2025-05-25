import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, Method } from "axios";
import $axios from "@/lib/axios.instance";

interface UseAxiosQueryOptions<TData, TError>
  extends Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> {
  axiosConfig?: AxiosRequestConfig;
  method?: Method;
  body?: any;
}

export function useAxiosQuery<TData = unknown, TError = AxiosError>(
  url: string,
  options?: UseAxiosQueryOptions<TData, TError>
) {
  const { axiosConfig, method = "GET", body, ...queryOptions } = options || {};

  return useQuery<TData, TError>({
    queryKey: [url, method, body, axiosConfig],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        ...axiosConfig,
        method,
        url,
        ...(body && { data: body }),
      };

      const { data } = await $axios.request<TData>(config);

      console.log("data in the query are ", data);
      return data;
    },
    ...queryOptions,
  });
}

// Example usage:
// GET request
// const { data: getData } = useAxiosQuery('/api/properties', {
//   axiosConfig: {
//     params: { page: 1, limit: 10 }
//   }
// });

// POST request
// const { data: postData } = useAxiosQuery('/api/properties', {
//   method: 'POST',
//   body: { name: 'New Property', price: 100000 }
// });

// PUT request
// const { data: putData } = useAxiosQuery('/api/properties/123', {
//   method: 'PUT',
//   body: { price: 150000 }
// });

// DELETE request
// const { data: deleteData } = useAxiosQuery('/api/properties/123', {
//   method: 'DELETE'
// });
