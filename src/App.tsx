import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import ContentLoader from "./components/content-loader/ContentLoader";
import NotFound from "./components/notfoundpage/NotFound";
import FagomraaderPage from "./pages/FagomraaderPage";
import FastedataPage from "./pages/FastedataPage";
import VentekriterierPage from "./pages/VentekriterierPage";
import VentestatuskoderPage from "./pages/VentestatuskoderPage";
import {
  BASENAME,
  FAGOMRAADER,
  ROOT,
  VENTEKRITERIER,
  VENTESTATUSKODER,
} from "./util/constant";

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Suspense fallback={<ContentLoader />}>
        <Routes>
          <Route path={ROOT} element={<FastedataPage />} />
          <Route path={FAGOMRAADER} element={<FagomraaderPage />} />,
          <Route path={VENTEKRITERIER} element={<VentekriterierPage />} />,
          <Route path={VENTESTATUSKODER} element={<VentestatuskoderPage />} />,
          <Route path={"*"} element={<NotFound />} />,
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
