import React, { Component } from 'react';
import Router from './Router';
import Layout from './Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Router />
      </Layout>
    )
  }
}

export default App;
