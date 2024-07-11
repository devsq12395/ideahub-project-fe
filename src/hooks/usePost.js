import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../MyContext";

const usePost = () => {
    const { user, category } = useContext(MyContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreatePost = async (dataToSend) => {
        try {
            console.log (dataToSend);
            const newPost = await axios.post("https://ideahub-project.vercel.app/api/v1/posts", dataToSend);
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    const handleUpdatePost = async (dataToSend, postId) => {
        try {
            console.log (dataToSend);
            const editPost = await axios.put (`https://ideahub-project.vercel.app/api/v1/posts/edit/${postId}`, dataToSend);
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    const handleArchivePost = async (postId) => {
        try {
            const archivePost = await axios.put (`https://ideahub-project.vercel.app/api/v1/posts/archive/${postId}`, {});

            alert ("Post is archived!");
            navigate (`/${category.title}`);
        } catch (error) {
            alert (`Archiving post has errored: ${error}`);
            console.error(error);
            setError(error.response.data.message);
        }
    }

    const handleGetPost = async (postId) => {
        try {
            const {data: { data }} = await axios.post (`https://ideahub-project.vercel.app/api/v1/posts/${postId}`, {});
            console.log (data);

            return data;
        } catch {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    const handleCreateComment = async (dataToSend) => {
        try {
            const postId = dataToSend.postId;
            console.log (postId);
            const newPost = await axios.post (`https://ideahub-project.vercel.app/api/v1/posts/${postId}/comments`, dataToSend);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const handleGetComments = async (postId) => {
        try {
            console.log (`https://ideahub-project.vercel.app/api/v1/posts/comments/${postId}`);
            const {data: { data }} = await axios.get (`https://ideahub-project.vercel.app/api/v1/posts/comments/${postId}`, {});
            console.log (data);

            return data;
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    return {error, 
        handleCreatePost, 
        handleUpdatePost,
        handleGetPost, 
        handleGetComments, 
        handleCreateComment, 
        handleArchivePost
    };
}

export default usePost;