import React from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import ProductItem from '../components/ProductsItems/productsItem';

function PlpContainer() {
    return (
        <div>
            <h1>Product List</h1>
            <SearchBar />
            <br />
            <hr />
            <br />
            <ProductItem />
        </div>
    )
}

export default PlpContainer