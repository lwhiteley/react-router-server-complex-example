import * as React from 'react';
import Helmet from 'react-helmet';

const Images = (props) => (
  <div>
    <Helmet title={"Images"} />
    <img
      src={require('./images/sky.jpg')}
      width="100%"
    />
  </div>
);

export default Images;
