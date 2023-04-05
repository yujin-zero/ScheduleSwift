import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import Start from "./pages/Start";
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Test />}/>
            <Route path="/test2" element={<Test2 />}/>
            <Route path="/start" element={<Start />}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
