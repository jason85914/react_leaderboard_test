import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "./Home";
import Board from "./StyledComponents/Board.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Board>
      <Home />
    </Board>
  </StrictMode>
);
