import React from 'react';
import logo from './logo.png';
import './App.css';
import Movies from './components/Movies/Movies';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Movies />
      </main>
    </div>
  );
}

export default App;
