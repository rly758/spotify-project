import { Outlet, NavLink } from "react-router-dom";

function Root() {
  return (
    <>
      <p>You are logged in. This is the root component. </p>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="/element1">Element 1</NavLink>
            </li>
            <li>
              <NavLink to="/element2">Element 2</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
