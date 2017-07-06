import * as React from 'react';
import Helmet from 'react-helmet';
import './no-match.css';

const NoMatch = () => (
  <div className="no-match">
    <Helmet title={'404 Not Found'} />
    <div>
      404 Page not found!
    </div>
  </div>
);

export default NoMatch;
