import {SORT_TYPES, FILTERS} from './constants';

const SORT_BY_TYPE = {
  [SORT_TYPES.PRICE_LOW_TO_HEIGH]: (products) => products.sort((a, b) => a.price - b.price),
  [SORT_TYPES.PRICE_HEIGH_TO_LOW]: (products) => products.sort((a, b) => b.price - a.price),
  [SORT_TYPES.RATING]: (products) => products.sort((a, b) => b.rating - a.rating),
  null: (products) => products,
};

const FILTER_RULES = {
  [FILTERS.NAME]: (filterValue, {name}) => name.toLowerCase().includes(filterValue.toLowerCase()),
  [FILTERS.COLORS]: (filterValue, {color}) => filterValue.length ? filterValue.includes(color) : true,
  [FILTERS.MIN_PRICE]: (filterValue, {price}) => price >= (filterValue || 0),
  [FILTERS.MAX_PRICE]: (filterValue, {price}) => price <= (filterValue || Infinity),
};

// Export for testing purpose
const reduceProducts = ({sortType, filters, products}) => {
  // Apply all selected filters
  const filteredResult = products.filter((product) => Object.keys(filters).every(
    (filterName) => (FILTER_RULES[filterName](filters[filterName], product))
  ));

  // Apply selected sort and return result
  return SORT_BY_TYPE[sortType](filteredResult);
};

export default reduceProducts;