import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyContext from "../MyContext";
import useCategories from "../hooks/useCategories";
import usePost from "../hooks/usePost";
import Header from "../components/Header";
import styles from "./CategoryPosts.module.css";
import CreatePost from "../components/popups/CreatePost";

const CategoryPosts = () => {
    const navigate = useNavigate();

    const { categoryTitle } = useParams();
    const { category, setPost } = useContext(MyContext);
    const { error, handleSetCategory } = useCategories();

    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ showCreatePost, setShowCreatePost ] = useState(false);

    useEffect(() => {
        loadAllPosts();
    }, []);

    const loadAllPosts = async () => {
        const allPosts = await handleSetCategory(categoryTitle);
        console.log(allPosts);
        setPosts(allPosts);
        setLoading(false);
    };

    const clickPost = (post) => {
        console.log(post);
        setPost(post);
        navigate(`/posts/${post._id}`);
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                {loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <p className={styles.error}>{error}</p>
                ) : (
                    <>
                        <h1 className={styles.title}>{category.title}</h1>
                        <div className={styles.postBtns}>
                            <button className={styles.h3Button} onClick={() => setShowCreatePost(true)}>Create a post</button>
                        </div>
                        <div className={styles.grid}>
                            {posts.map((post) => (
                                <div key={post.id} className={styles.card} onClick={() => clickPost(post)}>
                                    <div className={styles.imageContainer}>
                                        <img src={post.post_img.path} alt={post.title} className={styles.image} />
                                    </div>
                                    <div className={styles.content}>
                                        <h2 className={styles.cardTitle}>{post.title}</h2>
                                        <p className={styles.postedBy}>Posted by: {post.userId.username}</p>
                                        <p className={styles.description}>{post.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showCreatePost && 
                            <CreatePost 
                                setShowCreatePost={setShowCreatePost} 
                                loadAllPosts={loadAllPosts} 
                                mode="create"
                            />
                        }
                    </>
                )}
            </div>
        </>
    );
};

export default CategoryPosts;
