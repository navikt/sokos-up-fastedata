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
      <Routes>
        <Route path={ROOT} element={<FastedataPage />} />
        <Route
          path={FAGOMRAADER}
          element={
            <Suspense fallback={<ContentLoader />}>
              <FagomraaderPage />
            </Suspense>
          }
        />
        <Route
          path={VENTEKRITERIER}
          element={
            <Suspense fallback={<ContentLoader />}>
              <VentekriterierPage />
            </Suspense>
          }
        />
        <Route
          path={VENTESTATUSKODER}
          element={
            <Suspense fallback={<ContentLoader />}>
              <VentestatuskoderPage />
            </Suspense>
          }
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
