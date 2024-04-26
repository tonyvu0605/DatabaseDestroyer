import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 20, height = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="componentIconify"
    icon={icon}
    sx={{ width, height, ...sx }}
    {...other}
  />
));

Iconify.propTypes = {
  icon: PropTypes.any.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  sx: PropTypes.object,
};

export default Iconify;
