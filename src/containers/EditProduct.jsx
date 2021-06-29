import React from 'react';
import EditProducts from '../components/EditProducts';
import initialState from '../initialState';

const EditProduct = (props) => {
  return (
    <EditProducts products={props} />
  );
}

export default EditProduct;