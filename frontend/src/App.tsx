import React, {useEffect, useState} from "react";
//import {createContext} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Crud from "./Crud";
// export const pageContext = React.createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);
  return (
    // <pageContext.Provider>
    <BrowserRouter>
      <Header
        onLogin={function (username: string, password: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Routes>
        {isAuthenticated ? <Route path="/" element={<Crud />} /> : undefined}
      </Routes>
    </BrowserRouter>
    // </pageContext.Provider>
  );
}

export default App;
