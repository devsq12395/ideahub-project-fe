import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import styles from './Categories.module.css';
import useCategories from "../hooks/useCategories";

const Categories = () => {
    const navigate = useNavigate();
    const {error, handleGetCategories} = useCategories();
    const [categories, setCategories] = useState ([]);
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        loadAllCategories ();
    },[]);

    const loadAllCategories = async () => {
        const allCat = await handleGetCategories ();
        console.log (allCat);
        setCategories (allCat);
        setLoading (false);
    }

    const categoryClick = (categoryTitle) => {
        navigate(`/${categoryTitle}`);
    }

    return <>
        <Header />
        <div className={styles.container}>
            <h1 className={styles.title}>Categories</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className={styles.grid}>
                    {categories.map((category) => (
                    <div key={category.id} className={styles.card} onClick={()=>categoryClick(category.title)}>
                        <img src={category.images.icon.path} alt={category.title} className={styles.image} />
                        <div className={styles.content}>
                            <h2 className={styles.cardTitle}>{category.title}</h2>
                            <p className={styles.description}>{category.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    </>
}

export default Categories;