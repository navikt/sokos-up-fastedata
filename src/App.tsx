import { useEffect } from "react";
import "./App.module.css";
import { VentekriterierPage } from "./pages/VentekriterierPage";
import { initGrafanaFaro } from "./util/grafanaFaro";

export default function App() {
  useEffect(() => {
    if (import.meta.env.MODE !== "mock" && import.meta.env.MODE !== "backend")
      initGrafanaFaro();
  }, []);

  return <VentekriterierPage />;
}
