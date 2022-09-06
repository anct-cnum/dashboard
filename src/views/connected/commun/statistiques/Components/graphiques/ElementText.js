import React from 'react';
import PropTypes from 'prop-types';

function ElementText(props) {

  return (
    <div className={props.classe}>{props.texte ?? props.textePluralize}</div>
  );
}

ElementText.propTypes = {
  texte: PropTypes.string,
  textePluralize: PropTypes.object,
  classe: PropTypes.string,
};


export default ElementText;
