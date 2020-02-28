import React, { useEffect } from 'react';
import './Search-bar.css';

import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { productsSearch, productsSearchWord } from '../../actions';
import withStoreService from '../hoc';

import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = props => {
    const { productsSearch, productsSearchWord, products,  search } = props;
    useEffect(() => {
        console.log(props);
        const filterProducts = products.filter(
            product => product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
        productsSearch(filterProducts);
    }, [search, productsSearch, products, productsSearchWord]);

    const searchHandler = e => {
        productsSearchWord(e.target.value);
    };

    return (
        <div>
            <>
                <Form>
                    <Row>
                        <Col sm={2}>
                            <Form.Control placeholder="Search..." value={search} onChange={searchHandler} />
                        </Col>
                    </Row>
                </Form>
            </>
        </div>
    );
};

const mapStateToProps = ({ productsList: { products, search } }) => ({ products, search });
const mapDispatchToProps = { productsSearch, productsSearchWord };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
