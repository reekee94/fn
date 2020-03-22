import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { currencyChange, currencyChangeCart } from '../../actions';
import './button.css'


const Button = ({ currencyOptions, currency, currencyChange, currencyChangeCart, currencyCart }) => {
    const [icon, setIcon] = useState(faEuroSign);

    const onClickHandler = () => {
        currency === 1 ? setIcon(faDollarSign) : setIcon(faEuroSign);
        currency === 1 ? currencyChange(currencyOptions) : currencyChange(1);
        currencyCart === 1 ? currencyChangeCart(currencyOptions) : currencyChangeCart(1);
    };

    return (
        <>
            <FontAwesomeIcon className='currency-icon' onClick={onClickHandler} icon={icon} />
        </>
    );
};

const mapStateToProps = ({ productsList: { currency }, cartReducer: { currencyCart } }) => ({ currency, currencyCart });
const mapDispatchToProps = { currencyChange, currencyChangeCart };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
