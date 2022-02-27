import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const getAllData = functions.https.onCall(
  async (params, context): Promise<object> => {
    const ref = admin.database().ref('/');
    const snapshot = await ref.get();

    return snapshot.val();
  }
);

export default getAllData;
