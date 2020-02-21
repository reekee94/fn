import React, { useState } from 'react';
import './searchBar.css';

let products = [
    {
        id: 1,
        name: 'product1',
        price: '100'
    },
    {
        id: 2,
        name: 'product2',
        price: '200'
    },
    {
        id: 3,

        name: 'product3',
        price: '300'
    },
    {
        id: 4,
        name: 'product4',
        price: '400'
    }
]

function SearchBar() {
    const [search, setSearch] = useState('')

    const updateSearch = e => {
        setSearch(e.target.value.substr(0, 20))
    }
    const filterProducts = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s2">
                            <input type="text" id="autocomplete-input" className="autocomplete" value={search} onChange={updateSearch.bind()} />
                            <label htmlFor="autocomplete-input">Search</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wrapper">
                {filterProducts.map((item) =>
                    <div className="productItem" key={item.id}> {item.name}</div>)
                }
            </div>
        </div>


    )
}

export default SearchBar;