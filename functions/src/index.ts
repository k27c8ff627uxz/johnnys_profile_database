require('firebase-admin').initializeApp();
import isConstruction from './api/isConstruction';
import account from './api/account';
import user from './api/user';
import profile from './api/profile';
import admin from './api/admin';

module.exports = {
  isConstruction,
  ...account,
  ...user,
  ...profile,
  ...admin,
};
