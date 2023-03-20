import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPageContainer from '../SearchPageContainer';
import {SORT_TYPES, FILTERS} from '../constants';

// Mock the products data
jest.mock('@app/components/common/products.mock', () => [
  { id: 1, name: 'Product A', color: 'red', price: 10.0, rating: 4.5 },
  { id: 2, name: 'Product B', color: 'blue', price: 20.0, rating: 3.5 },
  { id: 3, name: 'Product C', color: 'green', price: 30.0, rating: 5.0 },
]);


// Mock the products data
jest.mock('@app/components/SearchPage/SearchPageLayout', () => {
  const SearchPageLayout = ({ products, onFiltersChange, onSortChange}) => {
    const handleFiltersChange = (event) => onFiltersChange(event.target.name, event.target.value);
    const handleSortChange = (event) => onSortChange(event.target.value);

    return (
      <>
        <button data-testid="change-filters" onClick={handleFiltersChange} />
        <button data-testid="change-sort-type" onClick={handleSortChange} />
        <ul data-testid="product-list">
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.color} - {product.price} - {product.rating}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return SearchPageLayout;
});

describe('SearchPageContainer', () => {
  test('renders the product list', () => {
    render(<SearchPageContainer />);
    const productList = screen.getByTestId('product-list');
    expect(productList.children.length).toBe(3);
  });


  test('applies name filter', () => {
    render(<SearchPageContainer />);
    const changeFiltersButton = screen.getByTestId('change-filters');
    fireEvent.click(changeFiltersButton, { target: {name: FILTERS.NAME, value: 'Product A' } });
    const productList = screen.getByTestId('product-list');
    expect(productList.children.length).toBe(1);
    expect(productList.children[0].textContent).toContain('Product A');
  });

  test('applies color filter', () => {
    render(<SearchPageContainer />);
    const changeFiltersButton = screen.getByTestId('change-filters');
    fireEvent.click(changeFiltersButton, { target: {name: FILTERS.COLORS, value: 'red' } });
    const productList = screen.getByTestId('product-list');
    expect(productList.children.length).toBe(1);
    expect(productList.children[0].textContent).toContain('Product A');
  });

  test('applies price filter', () => {
    render(<SearchPageContainer />);
    const changeFiltersButton = screen.getByTestId('change-filters');
    fireEvent.click(changeFiltersButton, { target: {name: FILTERS.MIN_PRICE, value: '20' } });

    const productList = screen.getByTestId('product-list');
    expect(productList.children.length).toBe(2);
    expect(productList.children[0].textContent).toContain('Product B');
    expect(productList.children[1].textContent).toContain('Product C');
  });

  test('applies sorting', () => {
    render(<SearchPageContainer />);
    const changeFiltersButton = screen.getByTestId('change-sort-type');
    fireEvent.click(changeFiltersButton, { target: {value: SORT_TYPES.PRICE_LOW_TO_HEIGH } });

    const productList = screen.getByTestId('product-list');
    expect(productList.children.length).toBe(3);
    expect(productList.children[0].textContent).toContain('Product A');
    expect(productList.children[1].textContent).toContain('Product B');
    expect(productList.children[2].textContent).toContain('Product C');
  });
});