import * as admin from 'firebase-admin';
admin.initializeApp();
import account from './api/account';
import user from './api/user';
import workaround from './api/workaround';

module.exports = {
  ...account,
  ...user,
  ...workaround,
};
