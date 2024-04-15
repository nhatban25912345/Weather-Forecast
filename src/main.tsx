import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { LocationProvider } from "./GlobalVariable/LocationProvider.tsx";
import { StoreProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <StoreProvider>
    <App />
  </StoreProvider>,
  // </React.StrictMode>
);
