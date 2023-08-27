import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilAccountLogout,
  cilSpeedometer,
  cilStar,
  cilLibrary,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavItem,
    name: "Add Events",
    to: "/events",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Add participants",
    to: "/users",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Certificates",
    to: "/certificates",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Logout",
    to: "/logout",
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
];

export default _nav;
