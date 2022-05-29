import React from "react";
import {
  useLocation
} from "react-router-dom";

// displays a page header

export default function Notfound() {
  let location = useLocation();
  return (
    <div >
      <h3>
       404 Notfound for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}