import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';

const spinnerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
};

const Spinner = () => {
  return (
    <Loader
      style={spinnerStyle}
      variant="primary"
      animation="grow"
      role="status"
    >
      <span className="visually-hidden">Loading...</span> {/*not necessary*/}
    </Loader>
  );
};
export default Spinner;
