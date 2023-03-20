
import PropTypes from 'prop-types';

export const ProductPropType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};