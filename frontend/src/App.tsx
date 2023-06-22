import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header
        onLogin={function (username: string, password: string): void {
          throw new Error("Function not implemented.");
        }}
      ></Header>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //   </header>
    // </div>
  );
}

export default App;
