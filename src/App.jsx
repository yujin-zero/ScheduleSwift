import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
// import Login from "./pages/Login";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/test" element={<Test />}/>
            <Route path="/test2" element={<Test2 />}/>
            <Route path="/" element={<LoginPage />}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
