import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Admin from "../pages/Admin";
import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import About from "../pages/About";

const isAuthenticated = () => !!localStorage.getItem("token");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: isAuthenticated() ? <Admin /> : <Navigate to="/" />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
