import { Outlet, useLocation } from "react-router";

const FastedataPage = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/fastedata";

  return (
    <div style={{ padding: "2rem" }}>
      {isRoot && (
        <div>
          <h1>Velkommen til Fastedata 👋</h1>
          <p>
            Her kan du finne informasjon om ventekriterier og andre faste data.
          </p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default FastedataPage;
