const initialState = {
    products: [],
    product: {},
    search: '',
};

const productsSearch = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH':
            return {
                products: action.payload,
            };
        case 'SEARCH_WORD':
            return {
                search: action.payload,
            };
        default:
            return state;
    }
};

export default productsSearch;
