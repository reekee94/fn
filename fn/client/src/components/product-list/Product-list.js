import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';

function ProductList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);

    useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => setPosts(res.data));
            if(localStorage.getItem("postPerPage") !== null){
                setPostsPerPage(localStorage.getItem("postPerPage"))
            }
    }, []);

    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change view
    const paginateMethod = value => setCurrentPage(value);
    const changeItemsMethod = number => {
        setPostsPerPage(number);
        localStorage.setItem("postPerPage", number);
    };
    const changePagination = () => setCurrentPage(1);

    return (
        <section className="left-side">
            <ProductListButtonPages
                changeItems={changeItemsMethod}
                changeCurrentPage={changePagination}
                className="buttonsGroup"
            />
            <ProductListPosts posts={currentPosts} />
            <ProductListPaginator postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginateMethod} />
        </section>
    );
}

export default ProductList;
