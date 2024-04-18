import PropTypes from 'prop-types';
import NavBar from 'components/navBar/NavBar';

import CssBaseline from '@mui/material/CssBaseline';

import './defaultLayout.scss';

const DefaultLayout = ({ children }) => (
    <div className="default-layout">
      <CssBaseline />
      <NavBar />
      <div className="default-layout__content">
        {children}
      </div>
    </div>
  )

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;