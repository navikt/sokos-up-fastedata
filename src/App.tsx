import { BrowserRouter, Route, Routes } from "react-router";
import FaggrupperPage from "./pages/faggrupper/FaggrupperPage";
import FagomraaderForFaggrupper from "./pages/faggrupper/FagomraaderForFaggrupper";
import KjoreplanPage from "./pages/faggrupper/kjoreplan/KjoreplanPage";
import FagomraaderPage from "./pages/fagomraader/FagomraaderPage";
import FastedataPage from "./pages/fastedata/FastedataPage";
import FagomraaderForKlassekoder from "./pages/klassekoder/FagomraaderForKlassekoder";
import KlassekoderPage from "./pages/klassekoder/KlassekoderPage";
import NotFound from "./pages/notfound/NotFound";
import VentekriterierPage from "./pages/ventekriterier/VentekriterierPage";
import VentestatuskoderPage from "./pages/ventestatuskoder/VentestatuskoderPage";
import {
  BASENAME,
  FAGGRUPPER,
  FAGGRUPPER_FAGOMRAADER,
  FAGGRUPPER_KJOREPLANER,
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
        <Route
          path={FAGGRUPPER_FAGOMRAADER}
          element={<FagomraaderForFaggrupper />}
        />
        <Route path={FAGGRUPPER_KJOREPLANER} element={<KjoreplanPage />} />
        <Route path={VENTEKRITERIER} element={<VentekriterierPage />} />
        <Route path={VENTESTATUSKODER} element={<VentestatuskoderPage />} />
        <Route path={KLASSEKODER} element={<KlassekoderPage />} />
        <Route
          path={KLASSEKODER_FAGOMRAADER}
          element={<FagomraaderForKlassekoder />}
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
