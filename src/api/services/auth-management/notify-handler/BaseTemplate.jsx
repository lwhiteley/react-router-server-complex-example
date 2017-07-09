import React from 'react';
import PropTypes from 'prop-types';

const BaseTemplate = (props) => {
  const { hashLink } = props.data;
  return (
    <div>
      <p>[Default template]</p>
      {hashLink}
    </div>
  );
};

export default BaseTemplate;

BaseTemplate.propTypes = {
  data: PropTypes.shape({
    hashLink: PropTypes.string,
    user: PropTypes.shape({}),
    type: PropTypes.string,
    notifierOptions: PropTypes.shape({}),
    meta: PropTypes.shape({}),
    adminEmail: PropTypes.string,
  }).isRequired,
};
