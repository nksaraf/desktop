import React from "react";
import dynamic from "next/dynamic";
const App = dynamic(() => import("../app/index"), { ssr: false });

export default function A() {
  return <App />;
}
