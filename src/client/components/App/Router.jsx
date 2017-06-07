import React, { Component } from 'react';
import { Module } from 'react-router-server';
import { Switch, Route, Redirect } from 'react-router';
import NoMatch from '../NoMatch';

const Router = () =>  (
        <Switch>
            <Route
                exact
                path="/"
                render={matchProps => (
                <Module key="/" module={() => System.import('../Home')}>
                    {module => module ? <module.default {...matchProps}/> : null}
                </Module>
                )}
            />
            <Route
                exact
                path="/contact"
                render={() => <Redirect to="/about"/>}
            />
            <Route
                exact
                path="/about"
                render={matchProps =>
                <Module key="/about" module={() => System.import('../About')}>
                    {module => module ? <module.default {...matchProps}/> : null}
                </Module>
                }
            />
            <Route
                exact
                path="/images/all"
                render={matchProps =>
                <Module key="/images/all" module={() => System.import('../ImageView')}>
                    {module => module ? <module.default {...matchProps}/> : null}
                </Module>
                }
            />
            <Route component={NoMatch}/>
        </Switch>
    );
        
export default Router;     
