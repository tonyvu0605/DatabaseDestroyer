import PropTypes from 'prop-types';
import NavBar from 'components/navBar/NavBar';
import NavColumn from 'components/navColumn/NavColumn';

import CssBaseline from '@mui/material/CssBaseline';

import './defaultLayout.scss';

const DefaultLayout = ({ children }) => (
  <div className="defaultLayout">
    <CssBaseline />
    <NavBar />

    <div className="defaultLayout__content">
      <div className="defaultLayout__content__navColumn">
      <NavColumn />
      </div>
      <div className="defaultLayout__content__mainContent">
      {children}
      </div>
    </div>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
