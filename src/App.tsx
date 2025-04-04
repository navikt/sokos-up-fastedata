import { useEffect } from "react";
import "./App.module.css";
import { initGrafanaFaro } from "./util/grafanaFaro";
import Ventekriterier from "./pages/Ventekriterier";

export default function App() {
  useEffect(() => {
    if (import.meta.env.MODE !== "mock" && import.meta.env.MODE !== "backend")
      initGrafanaFaro();
  }, []);

  return <Ventekriterier />;
}
