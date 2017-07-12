import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseTemplate extends Component {
  constructor(props) {
    super(props);
    this.defaultText = 'Default template';
  }
  render() {
    const { hashLink } = this.props.data;
    return (
      <div>
        <p>[{this.defaultText}]</p>
        {hashLink}
      </div>
    );
  }
}

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
