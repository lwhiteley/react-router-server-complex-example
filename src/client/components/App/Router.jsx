import React from 'react';
import { Module } from 'react-router-server';
import { Switch, Route, Redirect } from 'react-router';
import NoMatch from '../NoMatch';
import PrivateRoute from './PrivateRoute';

const Router = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={matchProps => (
        <Module key="/" module={() => System.import('../Home')}>
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>
      )}
    />
    <Route
      exact
      path="/contact"
      render={() => <Redirect to="/about" />}
    />
    <Route
      exact
      path="/about"
      render={matchProps =>
        (<Module key="/about" module={() => System.import('../About')}>
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>)
      }
    />
    <Route
      exact
      path="/images/all"
      render={matchProps =>
        (<Module key="/images/all" module={() => System.import('../ImageView')}>
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>)
      }
    />

    <Route
      exact
      path="/login"
      render={matchProps =>
        (<Module key="/login" module={() => System.import('../Login')}>
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>)
      }
    />

    <Route
      exact
      path="/logout"
      render={matchProps =>
              (<Module key="/logout" module={() => System.import('../App/Logout')}>
                {(module) => { return module ? <module.default {...matchProps} /> : null; }}
              </Module>)
          }
    />

    <Route
      exact
      path="/signup"
      render={matchProps =>
        (<Module key="/signup" module={() => System.import('../Signup')}>
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>)
      }
    />

    <PrivateRoute
      exact
      path="/my-account"
      roles={['basic']}
      render={matchProps =>
              (<Module key="/my-account" module={() => System.import('../MyAccount')}>
                {(module) => { return module ? <module.default {...matchProps} /> : null; }}
              </Module>)
          }
    />

    <Route
      exact
      path="/signup/success"
      render={matchProps =>
        (<Module key="/signup/success" module={() => System.import('../Signup/Success')}>
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>)
      }
    />
    <Route
      exact
      path="/auth/:action(verify-email|reset-password)/:token"
      render={matchProps =>
        (<Module
          key="/auth/:action(verify-email|reset-password)/token"
          module={() => System.import('../Auth')}
        >
          {(module) => { return module ? <module.default {...matchProps} /> : null; }}
        </Module>)
      }
    />
    <Route component={NoMatch} />
  </Switch>
);

export default Router;
