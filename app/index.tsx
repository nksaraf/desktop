import React from "react";
import * as colors from "twind/colors";
import { setup } from "twind/shim";
import { css } from "twind/css";
import { getProjects } from "./index.api";
import { useQuery } from "./apiless";
import { QueryClient, QueryClientProvider } from "react-query";

setup({
  theme: {
    extend: {
      colors: colors,
    },
  },
});

function App() {
  const { data } = useQuery(getProjects);
  return (
    <div
      className={`h-screen w-screen bg-blueGray-300 ${css({
        "--tw-bg-opacity": 0.6,
      })}`}
    >
      {data.map((project) => (
        <div>{project}</div>
      ))}
    </div>
  );
}

const client = new QueryClient();

export default function WithClient() {
  return (
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
}
