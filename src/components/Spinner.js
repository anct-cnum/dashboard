import React from 'react';
import PropTypes from 'prop-types';

import { TailSpin } from 'react-loader-spinner';

export default function Spinner({ loading }) {
  return (
    <>
      { loading &&
      <div className="spinnerCustom">
        <TailSpin
          height="80"
          width="80"
          radius="9"
          color="#0a76f6"
          ariaLabel="Loading"
        />
      </div>
      }
    </>
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool
};
