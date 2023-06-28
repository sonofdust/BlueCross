// import React, {useEffect, useState, useContext, createContext} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Crud from "./Crud";
//import UserProvider, {UserContext} from "./contexts/LoginContext";
import {ExpireProvider} from "./contexts/ExpirationContext";

function App() {
  //  const {user} = useContext(UserContext);
  // useEffect(() => {
  //   // Check for token in localStorage
  //   setIsAuthenticated(!!localStorage.getItem("token"));
  // }, []);

  return (
    <ExpireProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </ExpireProvider>
  );
}

// In the Header component, you can use the values from the context
// function Header() {
//   const {
//     isAuthenticated,
//     setIsAuthenticated,
//     username,
//     setUserName,
//     password,
//     setPassWord,
//   } = useContext(AppContext);

//   // Use the context values here in your Header component

//   return <div>Your Header JSX</div>;
// }

export default App;
