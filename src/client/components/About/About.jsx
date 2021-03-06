import * as React from 'react';
import Helmet from 'react-helmet';

const Component = () => (
  <div>
    <Helmet title={'About'} />
    <h1>
      About
    </h1>
    <p>
      This is an example site using react, react-router, react-router-server, express and webpack.
    </p>

    <h1>
      Contact
    </h1>
    <p>
      John Doe<br />
      john.doe@gmail.com
    </p>
  </div>
);

export default Component;
