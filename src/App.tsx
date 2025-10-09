import { BrowserRouter, Route, Routes } from "react-router";
import FaggrupperPage from "./pages/faggrupper/FaggrupperPage";
import FagomraaderPage from "./pages/fagomraader/FagomraaderPage";
import FastedataPage from "./pages/fastedata/FastedataPage";
import KlassekodeFagomraaderPage from "./pages/klassekoder/KlassekodeFagomraaderPage";
import KlassekoderPage from "./pages/klassekoder/KlassekoderPage";
import NotFound from "./pages/notfound/NotFound";
import VentekriterierPage from "./pages/ventekriterier/VentekriterierPage";
import VentestatuskoderPage from "./pages/ventestatuskoder/VentestatuskoderPage";
import {
  BASENAME,
  FAGGRUPPER,
  FAGOMRAADER,
  KLASSEKODER,
  KLASSEKODER_FAGOMRAADER,
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
        <Route
          path={KLASSEKODER_FAGOMRAADER}
          element={<KlassekodeFagomraaderPage />}
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
