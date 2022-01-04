import React from 'react';
import MainFrameworkPC from './MainFrameworks/MainFrameworkPC';
import MainFrameworkMobile from './MainFrameworks/MainFrameworkMobile';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <MainFrameworkPC drawerWidth={240}/>
      <MainFrameworkMobile drawerWidth={240}/>
    </React.Fragment>
  );
};

export default App;
