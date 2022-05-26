import React from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import {isAuthenticatedUser } from './Helpers/Auth';

const AdminRoute =  ({component: Component, ...rest}) => {
  return(
     <Route
      {...rest}
      render={(props) =>
        isAuthenticatedUser() && isAuthenticatedUser().role === 1 ? (
            <Component {...props} />
        ) : (
            <Navigate to='/signin' />
        )
    }
     />
  )}
DB
export default AdminRoute;

