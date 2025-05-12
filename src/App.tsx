import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./components/NotFound";
import FastedataPage from "./pages/FastedataPage";
import VentekriterierPage from "./pages/VentekriterierPage";
import VentestatuskoderPage from "./pages/VentestatuskoderPage";
import {
  BASENAME,
  ROOT,
  VENTEKRITERIER,
  VENTESTATUSKODER,
} from "./util/constant";

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path={ROOT} element={<FastedataPage />} />
        <Route path={VENTEKRITERIER} element={<VentekriterierPage />} />,
        <Route path={VENTESTATUSKODER} element={<VentestatuskoderPage />} />,
        <Route path={"*"} element={<NotFound />} />,
      </Routes>
    </BrowserRouter>
  );
}
