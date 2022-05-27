import React from "react";
import {
  useParams
} from "react-router-dom";
// displays a page header

export default function Album() {
  let { id } = useParams();
  return (
   <div> {id}</div>


  );
}
