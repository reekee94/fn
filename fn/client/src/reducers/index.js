import categoriesList from './Categories-reducer';
import productsList from './Products-reducer';
import catalogsList from './Catalog-reducer';
import productsSearch from './Search-reducer';

import { combineReducers } from 'redux';

export default combineReducers({
    productsList,
    categoriesList,
    catalogsList,
    productsSearch,
})
