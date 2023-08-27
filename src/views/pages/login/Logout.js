import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "set", user: null });
  }, []);
  return <div></div>;
}

export default Logout;
