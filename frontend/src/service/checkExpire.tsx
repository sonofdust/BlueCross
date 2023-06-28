import jwtDecode from "jwt-decode";

const checkExpireJWT = () => {
  const token = localStorage.getItem("token"); // Replace with your own token retrieval logic

  if (token) {
    const decodedToken: {exp: number} = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const duration = decodedToken.exp < currentTime;

    //    console.log("Duration: ", decodedToken.exp, "Expire: ", currentTime);
    return duration;
  } else {
    return true;
  }
};

export default checkExpireJWT;
