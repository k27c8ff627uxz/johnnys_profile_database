require('firebase-admin').initializeApp();
import account from './api/account';
import user from './api/user';
import profile from './api/profile';
import admin from './api/admin';

module.exports = {
  ...account,
  ...user,
  ...profile,
  ...admin,
};
