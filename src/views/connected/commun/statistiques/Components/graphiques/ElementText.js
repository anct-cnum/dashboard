import React from 'react';
import PropTypes from 'prop-types';

function ElementText({ texte, textePluralize, classe }) {

  return (
    <div className={classe}>{texte ?? textePluralize}</div>
  );
}

ElementText.propTypes = {
  texte: PropTypes.string,
  textePluralize: PropTypes.string,
  classe: PropTypes.string,
};


export default ElementText;
