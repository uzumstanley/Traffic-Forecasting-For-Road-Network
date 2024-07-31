import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "@/pages/AboutPage.tsx";
import MapPage from "./pages/MapPage";
import ContactPage from "@/pages/ContactPage.tsx";
import Layout from "./pages/Layout";
import HomePage from "@/pages/HomePage.tsx";

const routes = createBrowserRouter([
    {
        path: "/", element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "about", element: <AboutPage/>},
            {index: true, element: <HomePage/>},
            {path: "contact", element: <ContactPage/>},
            {path: "map", element: <MapPage/>},
        ],
    },
]);

export default routes;