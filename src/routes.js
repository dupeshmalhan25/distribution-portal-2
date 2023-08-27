import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Events = React.lazy(() => import("./views/Events/Event"));
const Users = React.lazy(() => import("./views/Users/Users"));
const Certificates = React.lazy(() =>
  import("./views/Certificates/Certificates")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/certificates", name: "Certificates", element: Certificates },
  { path: "/events", name: "Events", element: Events },
  { path: "/users", name: "Users", element: Users },
];
export default routes;
