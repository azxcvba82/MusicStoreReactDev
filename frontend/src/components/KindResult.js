import React from "react";
import {
  useParams
} from "react-router-dom";

// displays a page header

export default function KindResult() {
  let { id } = useParams();
  return (
    <div class="albumPanel">{id}</div>

  );
}
