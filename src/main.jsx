import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import CardDetail from "./pages/CardDetail/CardDetail.jsx";

const router =  createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/:cardID",
        element: <CardDetail />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
