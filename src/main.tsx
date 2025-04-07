import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KeycloakContextProvider from "./context/KeycloakContext.tsx";
import ProtectedRouteRegister from "./utils/ProtectedRouteRegsiter.tsx";
import NotFoundURL from "./components/404/NotFoundURL.tsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFoundURL />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KeycloakContextProvider>
      <ProtectedRouteRegister>
        <RouterProvider router={route} />
      </ProtectedRouteRegister>
    </KeycloakContextProvider>
  </StrictMode>
);
