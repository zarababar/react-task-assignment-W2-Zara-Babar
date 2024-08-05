// import ReactDOM from 'react-dom/client';

// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DataProvider } from './DataContext'; // Import your context provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider> 
      <App />
    </DataProvider>
  </React.StrictMode>
);

