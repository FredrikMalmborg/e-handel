import React from 'react';
import './App.css';
import Structure from '../layout/structure';
import { Container, Box, Typography, Button } from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';



function App() {
  return (
    <ScopedCssBaseline>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Create React App v4-beta example
        </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Hello World
     </Button>
      </Container>
    </ScopedCssBaseline>


  )
}

export default App;
