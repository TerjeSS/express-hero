import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Signin from "./Signin";

const Homepage = () => {
  return <Link to={"/signin"}>Log in</Link>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/*"} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
