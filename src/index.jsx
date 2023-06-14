import React from "react";
import ReactDOM from "react-dom/client";
import './assets/style/style.scss';

import { App } from "./App";
import { Providers } from "./providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Providers>
    <App />
  </Providers>,
);
