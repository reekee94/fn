import React from 'react';
import './Routes.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  HomePageContainer,
  CategoriesPageContainer,
  ProductListPageContainer,
  ProductDetailsContainer,
  CheckoutContainer,
} from '../../containters';

import AppHeader from '../app-header';
import Register from '../register';
import AppFooter from '../app-footer';
import Cart from "../cart/Cart";
import Wishlist from '../wish-list/Wish-list'
import Login from '../login/Login';
import UserPage from '../user-page';
import Thanks from '../thanks-page'
import OopsPage from '../oops-page';


const Routes = () => (
  <Router>
    <AppHeader />
    <div className='container'>
      <Switch>
        <Route path="/" exact component={HomePageContainer} />
        <Route
          path="/catalogs/:name"
          exact
          render={({ match }) => {
            const { name } = match.params;
            return <CategoriesPageContainer catalog={name} />;
          }}
        />
        <Route path="/register" exact component={Register} />
        <Route
          path="/productlist/:name"
          exact
          render={({ match }) => {
            const { name } = match.params;
            return <ProductListPageContainer catalog={name} />;
          }}
        />
        <Route
          path="/products/:id"
          exact
          render={({ match }) => {
            const { id } = match.params;
            return <ProductDetailsContainer id={id} />;
          }}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/wishlist" exact component={Wishlist} />
        <Route path="/checkout" exact component={CheckoutContainer} />
        <Route path="/userpage" exact component={UserPage} />
        <Route path="/thanks" exact component={Thanks} />
        <Route path="/oops" exact component={OopsPage} />
      </Switch>
    </div>
    <AppFooter />
  </Router>
);

export default Routes;
