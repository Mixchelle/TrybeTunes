import PropTypes from 'prop-types';
import React from 'react';

class Loading extends React.Component {
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <h1>Carregando...</h1>
      );
    }
    return '';
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
