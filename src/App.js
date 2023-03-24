import "./App.css";
import Home from "./components/Home";
import Detail from "./components/detail";
import { BrowserRouter, Route, Rotues, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
