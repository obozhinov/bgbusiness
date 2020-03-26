import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container fluid="xl" className="App">
      <main>
       <Navigation/>
      </main>
    </Container>
  );
}

export default App;
