import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import { productsLoaded, productsRequested } from './Products-actions';
import { catalogsLoaded, catalogsRequested, catalogLoaded } from './Catalogs-actions';

import {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveCategory,
    filterRemoveColor,
    filterRemoveBrand,
    composeFilters,
} from './Filter-actions';

export {
    categoriesRequested,
    categoriesLoaded,
    catalogLoaded,
    catalogsLoaded,
    catalogsRequested,
    productsRequested,
    productsLoaded,
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveBrand,
    filterRemoveCategory,
    filterRemoveColor,
    composeFilters,
};
