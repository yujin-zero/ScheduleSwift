import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Test />}/>
            <Route path="/test2" element={<Test2 />}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
