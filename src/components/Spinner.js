import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Oval } from 'react-loader-spinner';

import { alerteEtSpinnerActions } from '../actions';

export default function Spinner({ loading }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(alerteEtSpinnerActions.isLoading(loading));
  }, [loading]);

  return (
    <>
      { loading &&
      <div className="spinnerCustom">
        <Oval
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
