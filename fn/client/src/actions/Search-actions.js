const productsSearch = search => ({
    type: 'SEARCH',
    payload: search,
});

const productsSearchWord = search => ({
    type: 'SEARCH_WORD',
    payload: search,
});

export { productsSearch, productsSearchWord };
