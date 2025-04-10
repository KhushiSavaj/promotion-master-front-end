import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './helpers/Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (Auth.isUserAuthenticat()) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;