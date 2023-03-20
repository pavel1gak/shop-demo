import React from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

import {ProductPropType} from '@app/components/common/propTypes';

const ProductCard = ({imageUrl, name, description, color, price, rating}) => (
  <Card>
    <CardMedia
      style={{height: 0, paddingTop: '100%'}}
      image={imageUrl}
      title={name}
    />
    <CardContent>

      <Stack spacing={1}>
        <Typography
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'}}
          variant="h5" >
          {name}
        </Typography>
        <Typography style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal'
        }}  variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography><b>Color: </b><span style={{textTransform:'capitalize'}}>{color}</span></Typography>
        <Typography><b>Price: </b>{`$${price}`}</Typography>
        <Typography><b>Rating: </b>{rating}</Typography>
      </Stack>
    </CardContent>
  </Card>
);

ProductCard.propTypes = ProductPropType;

export default ProductCard;
