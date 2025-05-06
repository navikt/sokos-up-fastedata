import { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import ContentLoader from "./components/ContentLoader";
import FastedataPage from "./pages/FastedataPage";
import VentekriterierPage from "./pages/VentekriterierPage";
import VentestatuskoderPage from "./pages/VentestatuskoderPage";
import { BASENAME } from "./util/constant";

export default function App() {
  return (
    <Suspense fallback={<ContentLoader />}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path="fastedata" element={<FastedataPage />} />
              <Route
                path="fastedata/ventekriterier"
                element={<VentekriterierPage />}
              />
              <Route
                path="fastedata/ventestatuskoder"
                element={<VentestatuskoderPage />}
              />
            </>,
          ),
          { basename: BASENAME },
        )}
      />
    </Suspense>
  );
}
