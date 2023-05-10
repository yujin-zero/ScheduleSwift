import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import Start from "./pages/Start";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import Lectureapply from "./pages/Lectureapply"
import RequestSeat from "./pages/RequestSeat"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Start />}/>
            <Route path="/test" element={<Test />}/>
            <Route path="/test2" element={<Test2 />}/>
            <Route path="/loginpage" element={<LoginPage />}/>
            <Route path="/lectureapply" element={<Lectureapply />}/>
            <Route path="/joinpage" element={<JoinPage />} />
            <Route path="/requestSeat" element={<RequestSeat />}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
