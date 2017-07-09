import * as React from 'react';
import Helmet from 'react-helmet';

const Images = () => (
  <div>
    <Helmet title={'Images'} />
    <img
      alt="sky"
      src={require('./images/sky.jpg')}
      width="100%"
    />
  </div>
);

export default Images;
