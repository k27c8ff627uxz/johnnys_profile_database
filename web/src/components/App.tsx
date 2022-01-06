import React from 'react';
import MainFramework from './MainFrameworks/MainFramework';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainFramework drawerWidth={240}/>
    </BrowserRouter>
  );
};

export default App;
