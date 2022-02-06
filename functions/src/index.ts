import * as admin from 'firebase-admin';
admin.initializeApp();
import account from './api/account';
import user from './api/user';

module.exports = {
  ...account,
  ...user,
};
