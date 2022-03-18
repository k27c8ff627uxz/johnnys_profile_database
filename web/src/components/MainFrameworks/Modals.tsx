import FrameworkViewContainer from 'models/frameworkView';
import React from 'react';
import { MySuccessSnackbar } from 'utils/mycomponents';

const Modals = () => {
  const { modalsOpen, setModalsOpen } = FrameworkViewContainer.useContainer();
  return (
    <React.Fragment>
      <MySuccessSnackbar open={modalsOpen.logout} autoHideDuration={6000} onClose={() => setModalsOpen({ ...modalsOpen, logout: false })}>
        ログアウトしました。
      </MySuccessSnackbar>
    </React.Fragment>
  );
};

export default Modals;
