import React from 'react';
import EditOrders from '../components/EditOrders';
import initialState from '../initialState';

const EditOrder = (props) => {
  return (
    <EditOrders products={props} />
  );
}

export default EditOrder;