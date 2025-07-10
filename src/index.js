import * as React from "react";
import { createRoot } from "react-dom/client";
import { 
    createBrowserRouter,
    RouterProvider,
    }from "react-router-dom";
import App from "./App";
import AllAbout from "./About/AllAbout";
import AllFeatures from "./Features/AllFeatures";
import AllHowItWorks from "./HowItWorks/AllHowItWorks";
import AllContact from "./Contact/AllContact";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App/> ,
        index: true,
    },
    {
        path: "About",
        element: <AllAbout/>,
    },
    {
        path: "features",
        element: <AllFeatures/>,
    },
    {
        path: "howItWorks",
        element: <AllHowItWorks/>,
    },
    {
        path: "contact",
        element: <AllContact/>,
    },
    ]);

    createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}/>
    );





