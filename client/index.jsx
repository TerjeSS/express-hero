import React from "react";
import {render} from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";


const Homepage = () => {
    return(
        <div>Welcome home</div>
        )
    }
    
    const App = () => {
        
        return (
            <BrowserRouter>
       <Routes>
           <Route path={"/"} element={<Homepage />} />
           <Route path={"/*"} element={<h2>Not found</h2>} />
       </Routes>
       </BrowserRouter>
    )
}

render(<App />, document.getElementById("app"))
