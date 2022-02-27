import workaround from './workaround';
import attachRolesToAdmin from './attachRolesToAdmin';
import getAllUserData from './getAllUserData';
import setAllUserData from './setAllUserData';

export default {
  ...workaround,
  attachRolesToAdmin,
  getAllUserData,
  setAllUserData,
};
