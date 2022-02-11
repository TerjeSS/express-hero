import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById("root"))

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

