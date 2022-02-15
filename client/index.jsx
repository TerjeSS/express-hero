import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Login";


const Homepage = () => {
    return(
        <div>Welcome home</div>
        )
    }
    
    const App = () => {
        
        return (
            <BrowserRouter>
       <Routes>
           <Route path={"/"} element={<Login />} />
           <Route path={"/*"} element={<h2>Not found</h2>} />
       </Routes>
       </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))
