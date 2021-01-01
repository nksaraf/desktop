import { useQuery as useBaseQuery } from "react-query";
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
  resolver._key = [endpoint, funcName];
  return resolver;
}

export function useQuery<Func extends (...args: any) => any>(
  resolver: Func,
  ...variables: Parameters<Func>
) {
  return useBaseQuery([...resolver._key, variables], async () => {
    return await resolver(...variables);
  });
}
