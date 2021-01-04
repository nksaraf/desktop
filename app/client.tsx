import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export function WithClient({ children }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
