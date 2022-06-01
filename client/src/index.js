import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>,
  </React.StrictMode>
);
