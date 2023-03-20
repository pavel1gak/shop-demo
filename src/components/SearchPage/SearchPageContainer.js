import React, { useState, useMemo, useCallback } from 'react';

import SearchPageLayout from '@app/components/SearchPage/SearchPageLayout';
import products from '@app/components/common/products.mock';

import {FILTERS} from './constants';
import reduceProducts from './reduceProducts';


const availableColors = [...new Set(products.map(({color}) => color))];

const SearchPageContainer = () => {
  const [filters, setFilters] = useState({
    [FILTERS.NAME]: '',
    [FILTERS.COLORS]: [],
    [FILTERS.MIN_PRICE]: 0,
    [FILTERS.MAX_PRICE]: Infinity,
  });

  const [sortType, setSortType] = useState(null);
  
  // Apply filters and sorting products
  const productsToShow = useMemo(() => reduceProducts({products, sortType, filters}), [products, sortType, filters]);

  const handleFiltersChange = useCallback((name, value) => {
    let colors = filters[FILTERS.COLORS];
    if (name === FILTERS.COLORS) { // If some color value changed - add or remove it from list of selected colors
      colors = colors.reduce((acc, color) => (color === value ? acc : [...acc, color]), colors.includes(value) ? [] : [value]);
    }
    setFilters({
      ...filters,
      [name]: name === FILTERS.COLORS ? colors : value,
    });
  });

  return (
    <SearchPageLayout
      onFiltersChange={handleFiltersChange}
      onSortChange={setSortType}
      products={productsToShow}
      colors={availableColors}
    />
  );
};

export default SearchPageContainer;
