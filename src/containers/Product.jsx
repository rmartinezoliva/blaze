import React from 'react';
import Products from '../components/Products';
import initialState from '../initialState';

const Product = () => {
  return (
    <Products products={initialState.products} />
  );
}

export default Product;