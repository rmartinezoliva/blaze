import React from 'react';
import CreateOrders from '../components/CreateOrders';
import initialState from '../initialState';

const CreateOrder = () => {
  return (
    <CreateOrders products={initialState.products} />
  );
}

export default CreateOrder;