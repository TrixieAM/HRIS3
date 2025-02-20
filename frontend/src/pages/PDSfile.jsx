import React from "react";
import { Container, Box, Grid, Link} from '@mui/material';
import FileImage from '../assets/FileImage.png'
import './css/style.css'

const PDSFileSelector = () => {
    return(
        <Container>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <h1 style={{width: '90%'}}>PDS File</h1>
          </div>
          <Grid  container spacing={{ xs: 3, md: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='ImageContainer'>
            <Grid item xs={3} sx={{textAlign: "center"}}>
              <Link href="pds1" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={FileImage}
                  sx={{
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
              <p>PDS1</p>
            </Grid>
            <Grid item xs={3} sx={{textAlign: "center"}}>
              <Link href="pds2" sx={{maxWidth: 350}}>
                <Box
                  component="img"
                  src={FileImage}
                  sx={{
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
              <p>PDS2</p>
            </Grid>
            <Grid item xs={3} sx={{textAlign: "center"}}>
              <Link href="pds3" sx={{maxWidth: 350, textAlign: "center"}}>
                <Box
                  component="img"
                  src={FileImage}
                  sx={{
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
              <p>PDS3</p>
            </Grid>
            <Grid item xs={3} sx={{textAlign: "center"}}>
              <Link href="pds4" sx={{maxWidth: 350, textAlign: "center"}}>
                <Box
                  component="img"
                  src={FileImage}
                  sx={{
                    width: '100%', // Set width
                    height: '200px', // Maintain aspect ratio
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                />
              </Link>
              <p>PDS4</p>
            </Grid>
          </Grid>
          
        </Container>
    )
}

export default PDSFileSelector;