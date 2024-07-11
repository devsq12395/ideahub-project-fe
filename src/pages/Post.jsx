import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyContext from "../MyContext";
import usePost from "../hooks/usePost";
import Header from "../components/Header";
import styles from "./Post.module.css";

import CreateComment from "../components/popups/CreateComment";
import ContentRender from "../components/ContentRender";
import CreatePost from "../components/popups/CreatePost";

const Post = () => {
    const { user, post } = useContext(MyContext);
    const { error, handleGetComments, handleArchivePost } = usePost();

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateComment, setShowCreateComment] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        const comments = await handleGetComments(post._id);
        console.log(post);
        console.log(comments);
        setComments(comments);
        setLoading(false);
    };

    const btnBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                        <div className={styles.postBtns}>
                            <button className={styles.h3Button} onClick={() => setShowCreateComment(true)}>Comment</button>
                        </div>
                        <div className={styles.post}>
                            <div className={styles.userInfo}>
                                <img src={post.userId.avatar.url} alt="Avatar" className={styles.avatar} />
                                <p className={styles.username}>{post.userId.username}</p>
                            </div>
                            <div className={styles.postContent}>
                                <img src={post.post_img.path} alt={post.title} className={styles.postImg} />
                                <h2 className={styles.postTitle}>{post.title}</h2>
                                <ContentRender content={post.content} className={styles.postText} />
                                
                                {user._id === post.userId._id && (
                                    <div className={styles.ownerBtns}>
                                        <button className={styles.h4Button} onClick={()=>setShowEditPost(true)}>Edit Post</button>
                                        <button className={styles.h4Button} onClick={()=>handleArchivePost(post._id)}>Archive Post</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.comments}>
                            {comments.map((comment) => (
                                <div key={comment.id} className={styles.comment}>
                                    <div className={styles.userInfo}>
                                        <img src={comment.userId.avatar.url} alt="Avatar" className={styles.avatar} />
                                        <p className={styles.username}>{comment.userId.username}</p>
                                    </div>
                                    <div className={styles.commentContent}>
                                        <ContentRender content={comment.content} className={styles.commentText} />

                                        {user._id === post.userId._id && (
                                            <div className={styles.ownerBtns}>
                                                <button className={styles.h4Button}>Edit Comment</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.postBtns}>
                            <button className={styles.h3Button} onClick={btnBack}>Back to Top</button>
                            <button className={styles.h3Button} onClick={() => setShowCreateComment(true)}>Comment</button>
                        </div>

                        {showCreateComment && <CreateComment setShowCreateComment={setShowCreateComment} loadAllData={loadAllData} />}
                        {showEditPost && <CreatePost 
                            setShowCreatePost={setShowEditPost} 
                            mode="edit"
                            editValues={{title: post.title, content: post.content}}
                        />}
                    </>
                )}
            </div>
        </>
    );
};

export default Post;
