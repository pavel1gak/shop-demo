import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SearchOff } from '@mui/icons-material';

import ProductCard from '@app/components/ProductCard';
import {ProductPropType} from '@app/components/common/propTypes';

import {SORT_TYPES, FILTERS} from './constants';


const SearchPageLayout = ({
  onFiltersChange,
  onSortChange,
  products,
  colors,
}) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleFiltersChange = useCallback((event) => {
    onFiltersChange(event.target.name, event.target.value);
  });

  // Debounce used to prevent search results jumping in case when user actively typing 
  const handleFiltersChangeWithDebounce = useCallback(debounce(handleFiltersChange, 500));

  return (
    <>
      <Card color='default' position="static">
        <Box m={2}>
          <Stack spacing={1}>
            <TextField name={FILTERS.NAME} onChange={handleFiltersChangeWithDebounce} label="Search" variant="outlined" fullWidth />
            <SortButtons onClick={onSortChange}/>
          </Stack>
        </Box>
      </Card>
      <div  style={{ display: 'flex', flexDirection: isMediumScreen ? 'column' : 'row' }}>
        <Box p={2} style={{width: isMediumScreen ? '100%' : '300px'}}>
          <Card variant="outlined" >
            <Box m={2}>
              <Stack spacing={1}>
                <Typography variant="h5">Color</Typography>
                <FormGroup data-testid="color-checkboxes">
                  {colors.map((color) => (
                    <FormControlLabel
                      key={color}
                      control={<Checkbox name={FILTERS.COLORS} onChange={handleFiltersChange} value={color} />}
                      style={{textTransform:'capitalize'}}
                      label={color}
                    />
                  ))}
                </FormGroup>
                <Divider />
                <Typography variant="h5">Price</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField name={FILTERS.MIN_PRICE} type="number" onChange={handleFiltersChangeWithDebounce} label="Min Price" variant="outlined" />
                  <TextField name={FILTERS.MAX_PRICE} type="number" onChange={handleFiltersChangeWithDebounce} label="Max Price" variant="outlined" />
                </Stack>
                <Divider />
                <Typography variant="h5">{`Total products: ${products.length}`}</Typography>
              </Stack>
            </Box>
          </Card>
        </Box>
        <Box p={2} style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
          {products.length ? (
            <Grid container spacing={2} data-testid="product-cards">
              {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} >
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SearchOff sx={{ fontSize: 64 }} />
              <Typography variant="h5" color="text.secondary">
                  No results found
              </Typography>
              <Typography color="text.secondary">
                  Try another search term or filters
              </Typography>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
};

SearchPageLayout.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(ProductPropType)).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchPageLayout;

const SORT_TITLES = {
  [SORT_TYPES.PRICE_LOW_TO_HEIGH]: 'Price Low to High',
  [SORT_TYPES.PRICE_HEIGH_TO_LOW]: 'Price High to Low',
  [SORT_TYPES.RATING]: 'Popular first',
};

function debounce(func, delay) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function SortButtons({onClick}) {
  const [selectedValue, setSelectedValue] = useState(null);
    
  const handleClick = (event) => {
    setSelectedValue(selectedValue === event.target.value ? null : event.target.value);
    if (onClick) onClick(selectedValue === event.target.value ? null : event.target.value);
  };
    
  return (
    <ButtonGroup variant="text" aria-label="text button group">
      {Object.keys(SORT_TITLES).map((sortType) => (
        <Button
          key={sortType}
          variant={selectedValue === sortType ? 'contained' : 'text'}
          onClick={handleClick}
          value={sortType}
        >
          {SORT_TITLES[sortType]}
        </Button>
      ))}
    </ButtonGroup>
  );
}

SortButtons.propTypes = {
  onClick: PropTypes.func,
};