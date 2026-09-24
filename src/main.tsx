import React from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BoardOverview } from "./views/board-overview/BoardOverview";
import { Catalogs } from "./views/catalogs/Catalogs";
import { Styleguide } from "./views/styleguide/Styleguide";
import { Rules } from "./views/rules/Rules";
import "./styles.css";
const views = [
  ["overview", "Overview", BoardOverview],
  ["catalog", "Content catalog", Catalogs],
  ["styleguide", "Styleguide", Styleguide],
  ["rules", "Living rules", Rules],
] as const;
function App() {
  const [view, setView] = useState("overview");
  const View = views.find((v) => v[0] === view)![2];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="app-header">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setView("overview");
          }}
        >
          <span className="brand-mark">↗</span>
          <span>
            WHERE WE GO
            <br />
            FROM HERE
          </span>
        </a>
        <nav aria-label="Main navigation">
          {views.map(([id, label]) => (
            <button
              key={id}
              aria-current={view === id ? "page" : undefined}
              onClick={() => {
                setView(id);
                window.scrollTo(0, 0);
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <span className="prototype-label">
          DESIGN WORKBENCH <b>v0.1</b>
        </span>
      </header>
      <main id="main" tabIndex={-1}>
        <View />
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
