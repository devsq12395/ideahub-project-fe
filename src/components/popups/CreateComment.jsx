import { useContext, useState } from 'react';
import styles from './CreatePost.module.css';
import MyContext from "../../MyContext";

import usePost from '../../hooks/usePost';

const CreateComment = ({ setShowCreateComment, loadAllData }) => {
    const { user, post } = useContext(MyContext);
    const { error, handleCreateComment } = usePost();
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataToSend = {
                userId: user._id,
                postId: post._id,
                content: content,
            }
            await handleCreateComment (dataToSend);

            alert ("Posting successfull!");
            setShowCreateComment (false);
            loadAllData ();
        } catch (error) {
            alert (error.message);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.title}>Create a New Comment</h2>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="content" className={styles.label}>Content</label>
                        <textarea id="content" name="content" rows="4" className={`${styles.input} ${styles.textarea}`} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.buttonCancel} onClick={()=>setShowCreateComment(false)}>Cancel</button>
                        <button type="submit" className={styles.buttonSubmit} onClick={handleSubmit}>Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateComment;
