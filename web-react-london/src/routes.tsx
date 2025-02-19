import { createBrowserRouter } from "react-router-dom";
// Use relative paths for the components and pages
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";  // Corrected to relative import
import MapPage from "./pages/MapPage";
import ContactPage from "./pages/ContactPage";  // Corrected to relative import
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";  // Corrected to relative import

const routes = createBrowserRouter([
    {
        path: "/", element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "about", element: <AboutPage /> },
            { index: true, element: <HomePage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "map", element: <MapPage /> },
        ],
    },
]);

export default routes;
