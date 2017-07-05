import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BaseTemplate extends Component {
  render() {
    const { hashLink } = this.props.data;
    return (
      <div>
        <p>[Default template]</p>
        {hashLink}
      </div>
    );
  }
}

BaseTemplate.propTypes = {
  data: PropTypes.shape({
    hashLink: PropTypes.string,
    user: PropTypes.shape({}),
    type: PropTypes.string,
    notifierOptions: PropTypes.shape({}),
    meta: PropTypes.shape({}),
  }).isRequired,
};
