import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const setAllData = functions.https.onCall(
  async (params, context): Promise<boolean> => {
    try {
      const data = JSON.parse(params);
      const ref = admin.database().ref('/');
      await ref.set(data);
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
);

export default setAllData;
