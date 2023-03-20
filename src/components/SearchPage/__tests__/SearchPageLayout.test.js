import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPageLayout from '../SearchPageLayout';

test('renders correctly', () => {
  const props = {
    onFiltersChange: jest.fn(),
    onSortChange: jest.fn(),
    products: [  {
      id: 1,
      imageUrl: 'someImageUrl',
      name: 'Super sneakers',
      description: 'Perfect sneakers',
      color: 'red',
      price: 3020,
      rating: 4.1,
    },
    {
      id: 2,
      imageUrl: 'someImageUrl',
      name: 'Puper sneakers',
      description: 'Such a good sneakers',
      color: 'white',
      price: 1408,
      rating: 5,
    }],
    colors: ['Red', 'Green', 'Blue'],
  };
  render(<SearchPageLayout {...props} />);
  const productCards = screen.getByTestId('product-cards');
  expect(productCards.children.length).toBe(2);
  expect(productCards.children[0].textContent).toContain('Super sneakers');
  expect(productCards.children[1].textContent).toContain('Puper sneakers');

  const colorsCheckboxes = screen.getByTestId('color-checkboxes');
  expect(colorsCheckboxes.children.length).toBe(3);
});