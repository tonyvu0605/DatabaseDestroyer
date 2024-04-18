import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@mui/material';

// ----------------------------------------------------------------------

const CustomAlert = ({error, sx, severity='error', className, props}) => {

  if (!error || typeof error !== 'string') {
    return null;
  }

  return (
    <Alert {...props} className={className} sx={{...sx, marginTop: '1rem'}} severity={severity}>{error}</Alert>
  );
};

export default CustomAlert;

CustomAlert.propTypes = {
  severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  sx: PropTypes.object,
  className: PropTypes.string,
  error: PropTypes.string,
  props: PropTypes.object,
}