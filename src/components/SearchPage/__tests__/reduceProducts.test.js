import reduceProducts from '../reduceProducts';
import { SORT_TYPES, FILTERS } from '../constants';

const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    rating: 3.5,
    color: 'red',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    rating: 4.5,
    color: 'blue',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 15,
    rating: 4,
    color: 'green',
  },
];

describe('reduceProducts', () => {
  it('should return all products when no filters or sorting are applied', () => {
    const result = reduceProducts({ sortType: null, filters: {}, products: mockProducts });
    expect(result).toEqual(mockProducts);
  });

  it('should filter by name', () => {
    const result = reduceProducts({ sortType: null, filters: { [FILTERS.NAME]: 'product 2' }, products: mockProducts });
    expect(result).toEqual([mockProducts[1]]);
  });

  it('should filter by color', () => {
    const result = reduceProducts({ sortType: null, filters: { [FILTERS.COLORS]: ['green'] }, products: mockProducts });
    expect(result).toEqual([mockProducts[2]]);
  });

  it('should filter by min price', () => {
    const result = reduceProducts({ sortType: null, filters: { [FILTERS.MIN_PRICE]: 15 }, products: mockProducts });
    expect(result).toEqual([mockProducts[1], mockProducts[2]]);
  });

  it('should filter by max price', () => {
    const result = reduceProducts({ sortType: null, filters: { [FILTERS.MAX_PRICE]: 15 }, products: mockProducts });
    expect(result).toEqual([mockProducts[0], mockProducts[2]]);
  });

  it('should sort by price low to high', () => {
    const result = reduceProducts({ sortType: SORT_TYPES.PRICE_LOW_TO_HEIGH, filters: {}, products: mockProducts });
    expect(result).toEqual([mockProducts[0], mockProducts[2], mockProducts[1]]);
  });

  it('should sort by price high to low', () => {
    const result = reduceProducts({ sortType: SORT_TYPES.PRICE_HEIGH_TO_LOW, filters: {}, products: mockProducts });
    expect(result).toEqual([mockProducts[1], mockProducts[2], mockProducts[0]]);
  });

  it('should sort by rating', () => {
    const result = reduceProducts({ sortType: SORT_TYPES.RATING, filters: {}, products: mockProducts });
    expect(result).toEqual([mockProducts[1], mockProducts[2], mockProducts[0]]);
  });

  it('should filter and sort', () => {
    const result = reduceProducts({ sortType: SORT_TYPES.RATING, filters: { [FILTERS.COLORS]: ['blue'] }, products: mockProducts });
    expect(result).toEqual([mockProducts[1]]);
  });
});