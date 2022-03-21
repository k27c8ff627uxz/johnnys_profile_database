require('firebase-admin').initializeApp();
import isConstruction from './api/isConstruction';
import getNews from './api/getNews';
import account from './api/account';
import user from './api/user';
import profile from './api/profile';
import admin from './api/admin';

module.exports = {
  isConstruction,
  getNews,
  ...account,
  ...user,
  ...profile,
  ...admin,
};
