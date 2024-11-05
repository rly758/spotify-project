import { Outlet } from "react-router-dom";
import Nav from "./Nav";

import "../styles/Root.scss";

function Root() {
  return (
    <div className="main-container">
      <div id="sidebar">
        <Nav />
      </div>
      <div id="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
