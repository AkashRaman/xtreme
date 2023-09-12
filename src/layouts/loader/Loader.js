import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";

const Loader = () => (
  <div className="fallback-spinner m-4 pe-0">
    <div className="loading">
      <Spinner color="primary" />
    </div>
  </div>
);
export default Loader;
