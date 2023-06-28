import jwtDecode from "jwt-decode";

const logOut = () => {
  localStorage.removeItem("token");
  return !localStorage.getItem("token");
};

export default logOut;
