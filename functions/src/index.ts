import * as admin from 'firebase-admin';
admin.initializeApp();
import account from './api/account';

module.exports = {
  ...account,
};
