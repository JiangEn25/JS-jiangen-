// HomePage.tsx
import React from 'react';
import { Typography, Container, Box, useTheme } from '@mui/material';

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
        Welcome to India's Rainfall Data Presentation Page for 1901 to 2015
        </Typography>
        <Typography variant="h6" paragraph>
        This is a web page dedicated to rainfall data for India from 1901 to 2015.In the left-hand column, you can see the detailed data.
        You can view different types of graphs and statistics by clicking on “ChartPage” in the left navigation bar of the page.
        These include annual total monthly rainfall line charts, quarterly average rainfall pie charts, monthly average rainfall histograms, and overall average annual rainfall, as well as average rainfall for the month.
        There's also a 3-D scatter plot that shows the relationship between August rainfall, summer rainfall, and annual rainfall.
        </Typography>
        <Typography variant="body1" paragraph>
        These charts give you an insight into the rainfall patterns and trends in India over this historical period. We provide intuitive data visualization tools that
        so that you can easily understand complex data sets and find valuable information in them.
        </Typography>
        <Typography variant="body1" paragraph>
        -------------------------------------------------------------------------------------------------------------------
        </Typography>
        <Typography variant="body1" paragraph>
        Please browse our website to explore more historical data on rainfall in India! If you have any questions or need further assistance, please feel free to contact us +79127894194.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;