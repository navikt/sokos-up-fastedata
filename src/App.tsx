import { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import "./App.module.css";
import ContentLoader from "./components/ContentLoader";
import FastedataPage from "./pages/FastedataPage";
import VentekriterierPage from "./pages/VentekriterierPage";
import { BASENAME, ROOT } from "./util/constant";

export default function App() {
  return (
    <Suspense fallback={<ContentLoader />}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route
              path={ROOT}
              element={<FastedataPage />}
              ErrorBoundary={ErrorBoundary}
            >
              <Route path="ventekriterier" element={<VentekriterierPage />} />
            </Route>,
          ),
          { basename: BASENAME },
        )}
      />
    </Suspense>
  );
}

function ErrorBoundary(): JSX.Element {
  return <div>Det oppstod en feil</div>;
}
