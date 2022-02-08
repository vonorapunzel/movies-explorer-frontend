import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>{() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />)}</Route>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;