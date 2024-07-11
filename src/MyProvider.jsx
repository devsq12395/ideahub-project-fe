import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [category, setCategory] = useState(
    localStorage.getItem("category") ? JSON.parse(localStorage.getItem("category")) : {}
  );
  const [post, setPost] = useState(
    localStorage.getItem("post") ? JSON.parse(localStorage.getItem("post")) : {}
  );

  const state = {
    isLoggedIn, setIsLoggedIn,
    user, setUser,
    category, setCategory,
    post, setPost
  };

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
