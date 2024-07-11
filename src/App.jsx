import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import './App.css';

import Login from "./pages/Login";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import Post from "./pages/Post";
import NewsFeed from "./pages/NewsFeed";
import Settings from "./pages/Settings";

function App() {
  const navigate = useNavigate();

  useEffect (() => {
    navigate ("/");
  }, []);

  return <>
    <Helmet>
      <title>IdeaHub Project</title>
    </Helmet>

    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/categories" element={<Categories />} />
      <Route path="/:categoryTitle" element={<CategoryPosts />} />
      <Route path="/posts/:postId" element={<Post />} />

      <Route path="/news-feed" element={<NewsFeed />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </>
}

export default App
