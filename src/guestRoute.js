import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './helpers/Auth';

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (!Auth.isUserAuthenticat()) {
          return <Component {...rest} {...props} />
        } else {
          return  (
            Auth.getUserDetail().user_role === 'SMI' ?
            <Redirect to={
              {
                pathname: '/smi/home',
                state: {
                  from: props.location
                }
              }
            } /> : 
            <Redirect to={
              {
                pathname: '/home',
                state: {
                  from: props.location
                }
              }
            } />
          )
        }
      }
    } />
  )
}

export default GuestRoute;