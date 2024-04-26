import PropTypes from 'prop-types';
import NavBar from 'components/navBar/NavBar';

import CssBaseline from '@mui/material/CssBaseline';

import './nullUserLayout.scss';

const NullUserLayout = ({ children }) => (
  <div className="NullUserLayout">
    <CssBaseline />
    <NavBar />

    <div className="NullUserLayout__content">{children}</div>
  </div>
);

NullUserLayout.propTypes = {
  children: PropTypes.node,
};

export default NullUserLayout;
