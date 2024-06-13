import { Suspense } from "react";
import Appbar from "../Appbar";

function Layout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        <Appbar />
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <main style={{ flexGrow: 1, padding: "1rem" }}>
            <div style={{ height: "56px" }}></div>
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  );
}

export default Layout;
