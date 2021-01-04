import {
  useQuery as useBaseQuery,
  useMutation as useBaseMutation,
} from "react-query";
interface Resolver {
  (...args): Promise<any>;
  _key: any;
}

export function createClientResolver(endpoint, funcName) {
  let resolver = async (...args) => {
    try {
      let res = await fetch(endpoint, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({
          method: funcName,
          args: args,
        }),
      });

      let js = await res.json();

      if (!res.ok) {
        throw js.error;
      }
      return js.data;
    } catch (e) {
      throw e;
    }
  };
  (resolver as Resolver)._key = [endpoint, funcName];
  return resolver;
}

export function useQuery<Func extends (...args: any) => any>(
  resolver: Func,
  ...variables: Parameters<Func>
) {
  return useBaseQuery<
    ReturnType<Func> extends Promise<infer U> ? U : ReturnType<Func>,
    Error
  >([...((resolver as unknown) as Resolver)._key, variables], async () => {
    return await resolver(...variables);
  });
}

export function useMutation<Func extends (...args: any) => any>(
  resolver: Func
) {
  const mutation = useBaseMutation<
    ReturnType<Func> extends Promise<infer U> ? U : ReturnType<Func>,
    Error,
    Parameters<Func>
  >([...((resolver as unknown) as Resolver)._key], async (params) => {
    return await resolver(...params);
  });

  return {
    ...mutation,
    mutate: (...params: Parameters<Func>) => {
      return mutation.mutate(params);
    },
  };
}
