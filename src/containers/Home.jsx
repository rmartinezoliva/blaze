import React from 'react';
import Orders from '../components/Orders';
import initialState from '../initialState';

const Home = () => {
  return (
    <Orders products={initialState.products} />
  );
}

export default Home;