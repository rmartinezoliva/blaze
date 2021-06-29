import React from 'react';
import CreateProducts from '../components/CreateProducts';
import initialState from '../initialState';

const CreateProduct = () => {
  return (
    <CreateProducts products={initialState.products} />
  );
}

export default CreateProduct;