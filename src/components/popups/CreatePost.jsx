import { useContext, useState, useEffect } from 'react';
import styles from './CreatePost.module.css';
import MyContext from "../../MyContext";
import { useNavigate } from "react-router-dom";

import usePost from '../../hooks/usePost';

const CreatePost = ({ setShowCreatePost, loadAllPosts, mode, editValues }) => {
    const { user, category, post } = useContext(MyContext);
    const { error, handleCreatePost, handleUpdatePost } = usePost();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [imageFile, setImageFile] = useState('');
    const [imagePrev, setImagePrev] = useState('');

    useEffect (()=>{
        if (mode==="edit"){
            setTitle (editValues.title);
            setContent (editValues.content);
        }
    },[]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile (file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePrev(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (mode === "create") {
                const dataToSend = new FormData();
                dataToSend.append("userId", user._id);
                dataToSend.append("categoryId", category._id);
                dataToSend.append("title", title);
                dataToSend.append("content", content);
                dataToSend.append("postImage", imageFile);
                await handleCreatePost (dataToSend);

                alert ("Posting successfull!");
                setShowCreatePost (false);
                loadAllPosts ();
            } else if (mode === "edit"){
                const dataToSend = { title, content };
                await handleUpdatePost (dataToSend, post._id);

                alert ("Updating successfull!");
                setShowCreatePost (false);
                navigate (`/posts/${post._id}`);
            }
        } catch (error) {
            alert (`Posting Failed: ${error.message}`);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.title}>{(mode==="create")? "Create a New Post" : "Edit Post"}</h2>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input type="text" id="title" name="title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    {mode==="create" && (
                        <div className={styles.formGroup}>
                            <label htmlFor="image" className={styles.label}>Post Image</label>
                            <input type="file" id="image" name="image" accept="image/*" className={styles.input} onChange={handleImageChange} />
                        </div>
                    )}
                    {mode==="create" && imagePrev!=='' && (
                        <div className={styles.imagePreviewContainer}>
                            <img src={imagePrev} alt="Preview" className={styles.previewImage} />
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="content" className={styles.label}>Content</label>
                        <textarea id="content" name="content" rows="4" className={`${styles.input} ${styles.textarea}`} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.buttonCancel} onClick={()=>setShowCreatePost(false)}>Cancel</button>
                        <button type="submit" className={styles.buttonSubmit} onClick={handleSubmit}>{(mode==="create")?"Create Post":"Edit Post"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
