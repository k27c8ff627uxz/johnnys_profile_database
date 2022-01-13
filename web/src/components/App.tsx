import React from 'react';
import MainFramework from './MainFrameworks/MainFramework';
import { HashRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainFramework drawerWidth={240}/>
    </HashRouter>
  );
};

export default App;
