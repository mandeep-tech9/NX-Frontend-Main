import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h2>Not found</h2>
      <Link to="/">Home</Link>
    </div>
  );
}
