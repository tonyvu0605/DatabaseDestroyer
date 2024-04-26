import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';

import './featureCard.scss';

const FeatureCard = ({ title, description, image, link }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card className="FeatureCard_featuresSection" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia className="FeatureCard__featuresSection__featureCardMedia" image={image} title={title} />
        <CardContent className="FeatureCard__featuresSection__cardContent" style={{ flex: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </Link>
  </Grid>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default FeatureCard;