import { useContext, useState } from "react";
import MyContext from "../MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      setLoading (true);

      const {
        data: { data },
      } = await axios.post("https://ideahub-project.vercel.app/api/v1/users/login", {
        username: username,
        password: password,
      });
      console.log (data);

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);

      alert ("Login success!");
      setLoading (false);

      navigate("/categories");
    } catch (error) {
      alert (`Login Failed: ${error.message}`);
      setLoading (false);
      console.error(error);
      setError(error.message);
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const {
        data: { data },
      } = await axios.post("https://ideahub-project.vercel.app/api/v1/users/register", {
        username: username,
        email: email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);

      alert ("Registration success!");
      navigate("/categories");
    } catch (error) {
      alert (`Registration Failed: ${error.message}`);
      console.error(error);
      setError(error.message);
    }
  };

  return {error, loading, handleLogin, handleRegister};
};

export default useLogin;
