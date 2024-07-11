import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../MyContext";

const useCategories = () => {
    const { category, setCategory } = useContext(MyContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGetCategories = async () => {
        try {
            const {
                data: { data },
            } = await axios.get("https://ideahub-project.vercel.app/api/v1/categories", {});
            console.log (data);

            return data;
        } catch {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    const handleSetCategory = async (categoryTitle) => {
        try {
            console.log(`https://ideahub-project.vercel.app/api/v1/categories/${categoryTitle}`);

            const { data: { data: dataCategory } } = await axios.get(`https://ideahub-project.vercel.app/api/v1/categories/${categoryTitle}`);
            console.log(dataCategory);
            setCategory(dataCategory);

            const { data: { data: dataPosts } } = await axios.get(`https://ideahub-project.vercel.app/api/v1/categories/${dataCategory.title}/posts`);
            console.log(dataPosts);

            return dataPosts;

        } catch {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    return {error, handleGetCategories, handleSetCategory};
}

export default useCategories;