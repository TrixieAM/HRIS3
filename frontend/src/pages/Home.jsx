import React from 'react';
import { Container, Box, Grid, Link} from '@mui/material';  // Assuming you are using react-router for navigation
import childrenDashboardIMG from '../assets/childrenDashboardIMG.jpg';
import LearningDevProgIMG from '../assets/LearningDevProgIMG.jpg';
import VoluntaryWork from '../assets/VoluntaryWork.jpg';
import EligibilityIMG from '../assets/EligibilityIMG.jpg';
import CollegeIMG from '../assets/CollegeIMG.jpg';
import VocationalIMG from '../assets/VocationalIMG.jpg';
const Home = () => {

    return (
        <Container>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <h1 style={{width: '90%'}}>Dashboards</h1>
          </div>
          <Grid  container spacing={{ xs: 3, md: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='ImageContainer'>
            <Grid item xs={3}>
              <Link href="ChildrenInfo" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={childrenDashboardIMG}
                  sx={{
                    border: 'black 1px solid',
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="Learningdev" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={LearningDevProgIMG}
                  sx={{
                    border: 'black 1px solid',
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="VoluntaryWork" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={VoluntaryWork}
                  sx={{
                    border: 'black 1px solid',
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="Eligibility" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={EligibilityIMG}
                  sx={{
                    border: 'black 1px solid',
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="College" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={CollegeIMG}
                  sx={{
                    border: 'black 1px solid',
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="Vocational" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={VocationalIMG}
                  sx={{
                    border: 'black 1px solid',
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
            </Grid>
          </Grid>
          
        </Container>
    );
};

export default Home;