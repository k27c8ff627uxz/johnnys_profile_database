import workaround from './workaround';
import attachRolesToAdmin from './attachRolesToAdmin';
import getAllUserData from './getAllUserData';
import setAllUserData from './setAllUserData';
import getAllData from './getAllData';
import setAllData from './setAllData';

export default {
  ...workaround,
  attachRolesToAdmin,
  getAllUserData,
  setAllUserData,
  getAllData,
  setAllData,
};
