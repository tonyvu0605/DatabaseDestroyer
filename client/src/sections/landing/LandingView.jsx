import React from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  Card,
  Container,
  CardMedia,
  Typography,
  CardContent,
} from '@mui/material';

import './landingView.scss';

const LandingView = () => (
  <div className="LandingView">
    <div className="LandingView__hero">
      <Container maxWidth="lg">
        <div className="LandingView__hero">
          <Typography variant="h2" component="h1" gutterBottom>
            NBA Basketball Encyclopedia
          </Typography>
          <Typography variant="h5" paragraph>
            Explore the world of NBA with detailed statistics and insights.
          </Typography>
        </div>
      </Container>
    </div>
    <Container maxWidth="lg">
      <div className="LandingView__featuresSection">
        <Typography variant="h4" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/player" style={{ textDecoration: 'none' }}>
              <Card className="LandingView__featuresSection__featureCard">
                <CardMedia
                  className="LandingView__featuresSection__featureCardMedia"
                  image="/assets/playerHeroComp.png"
                  title="Player Statistics"
                />
                <CardContent className="LandingView__featuresSection__cardContent">
                  <Typography gutterBottom variant="h5" component="h2">
                    Player Statistics
                  </Typography>
                  <Typography>
                    Access comprehensive statistics for individual players, including performance metrics and salaries.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/team" style={{ textDecoration: 'none' }}>
              <Card className="LandingView__featuresSection__featureCard">
                <CardMedia
                  className="LandingView__featuresSection__featureCardMedia"
                  image="/assets/teamHeroComp.png"
                  title="Team Statistics"
                />
                <CardContent className="LandingView__featuresSection__cardContent">
                  <Typography gutterBottom variant="h5" component="h2">
                    Team Statistics
                  </Typography>
                  <Typography>
                    Explore team-level statistics, including team performance, payroll, and historical data.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/highScoringGame" style={{ textDecoration: 'none' }}>
              <Card className="LandingView__featuresSection__featureCard">
                <CardMedia
                  className="LandingView__featuresSection__featureCardMedia"
                  image="/assets/gameHeroComp.png"
                  title="Game Statistics"
                />
                <CardContent className="LandingView__featuresSection__cardContent">
                  <Typography gutterBottom variant="h5" component="h2">
                    Game Statistics
                  </Typography>
                  <Typography>
                    Dive into each games stats showing which teams played and the points scored.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  </div>
);

export default LandingView;