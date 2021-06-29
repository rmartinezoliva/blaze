import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';
import Product from '../containers/Product';

import CreateProducts from '../containers/CreateProduct';
import EditProduct from '../containers/EditProduct';
import CreateOrder from '../containers/CreateOrder';
import EditOrder from '../containers/EditOrder';



const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Product} />  
            <Route exact path="/create-product" component={CreateProducts} />  
            <Route exact path="/create-order" component={CreateOrder} /> 
            <Route exact path="/edit-product/:id" component={EditProduct} />
            <Route exact path="/edit-order/:id/:numero" component={EditOrder} />   
            <Route exact path="/orders" component={Home} />       
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;