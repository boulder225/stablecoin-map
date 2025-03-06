import React from 'react';
import './App.css';
import ConcordiumWardleyMap from './stablecoin-map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Concordium Stablecoin Infrastructure</h1>
      </header>
      <main style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <ConcordiumWardleyMap />
      </main>
    </div>
  );
}

export default App;