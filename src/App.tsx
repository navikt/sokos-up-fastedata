import { BrowserRouter, Route, Routes } from "react-router";
import FaggrupperPage from "./components/faggrupper/FaggrupperPage";
import FagomraaderPage from "./components/fagomraader/FagomraaderPage";
import KlassekoderPage from "./components/klassekoder/KlassekoderPage";
import VentekriterierPage from "./components/ventekriterier/VentekriterierPage";
import VentestatuskoderPage from "./components/ventestatuskoder/VentestatuskoderPage";
import FastedataPage from "./pages/fastedata/FastedataPage";
import NotFound from "./pages/notfound/NotFound";
import {
  BASENAME,
  FAGGRUPPER,
  FAGOMRAADER,
  KLASSEKODER,
  ROOT,
  VENTEKRITERIER,
  VENTESTATUSKODER,
} from "./util/paths";

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path={ROOT} element={<FastedataPage />} />
        <Route path={FAGOMRAADER} element={<FagomraaderPage />} />
        <Route path={FAGGRUPPER} element={<FaggrupperPage />} />
        <Route path={VENTEKRITERIER} element={<VentekriterierPage />} />
        <Route path={VENTESTATUSKODER} element={<VentestatuskoderPage />} />
        <Route path={KLASSEKODER} element={<KlassekoderPage />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
