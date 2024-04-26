import React from 'react';
import { FeatureCard } from 'components/customMUIComponents';

import { Grid, Container, Typography } from '@mui/material';

import './landingView.scss';

const features = [
  {
    title: 'Player Statistics',
    description: 'Access comprehensive statistics for individual players, including performance metrics and salaries.',
    image: '/assets/playerHeroComp.png',
    link: '/player',
  },
  {
    title: 'Team Statistics',
    description: 'Explore team-level statistics, including team performance, payroll, and historical data.',
    image: '/assets/teamHeroComp.png',
    link: '/team',
  },
  {
    title: 'Game Statistics',
    description: 'Dive into each games stats showing which teams played and the points scored.',
    image: '/assets/gameHeroComp.png',
    link: '/highScoringGame',
  },
  {
    title: 'Team Salaries',
    description: "How much did a team pay in total to all it's players in 2011? Figure out the answer by looking at the history of team salaries.",
    image: '/assets/teamSalariesHeroComp.png',
    link: '/teamSalaries',
  },
  {
    title: 'Player Salary',
    description: 'Explore team-level statistics, including team performance, payroll, and historical data.',
    image: '/assets/playerSalariesHeroComp.jpg',
    link: '/playerSalaries',
  },
  {
    title: 'Team Performances',
    description: 'See how a team has performed historically through the years based on their wins and losses.',
    image: '/assets/teamPerformanceHeroComp.png',
    link: '/teamPerformance',
  },
  {
    title: 'Seasonal Point Averages',
    description: 'Ever wondered what the average points for a home team and away team was in a certain season? Explore the history of point averages to find out.',
    image: '/assets/seasonalPtsHeroComp.png',
    link: '/seasonalPointsAverage',
  },
];


const LandingView = () => (
  <div className="LandingView">
    <div className="LandingView__hero">
      <Container maxWidth="lg" >
        <Typography variant="h2" component="h1" gutterBottom>
          NBA Basketball Encyclopedia
        </Typography>
        <Typography variant="h5" paragraph>
          Explore the world of NBA with detailed statistics and insights.
        </Typography>
      </Container>
    </div>
    <Container maxWidth="lg">
      <div className="LandingView__featuresSection">
        <Typography variant="h4" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </Grid>
      </div>
    </Container>
  </div>
);

export default LandingView;