import './App.css';
import React from "react";
import Forecast from './components/Forecast';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router basename={process.env.PUBLIC_URL}>
          <Forecast />
        </Router>
        
      </header>
    </div>
  );
}

export default App;
