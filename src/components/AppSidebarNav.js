import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { CBadge } from "@coreui/react";
import { useSelector } from "react-redux";

export const AppSidebarNav = ({ items }) => {
  const location = useLocation();

  const navLink = (name, icon, badge) => (
    <>
      {icon && icon}
      {name && name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto">
          {badge.text}
        </CBadge>
      )}
    </>
  );

  const user = useSelector((state) => state.user);

  const renderNavItem = (item, index) => {
    let { component, name, badge, icon, ...rest } = item;
    const Component = component;

    console.log(rest);
    if (!user && (name === "Add Events" || name === "Add participants"))
      return null;
    if (!user && name === "Logout") {
      rest.to = "/login";
      name = "Login";
    }
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const renderNavGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;

    return (
      <Component
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((subItem, subIndex) =>
          subItem.items
            ? renderNavGroup(subItem, subIndex)
            : renderNavItem(subItem, subIndex)
        )}
      </Component>
    );
  };

  return (
    <>
      {items &&
        items.map((item, index) =>
          item.items ? renderNavGroup(item, index) : renderNavItem(item, index)
        )}
    </>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
