import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const isConstruction = functions.https.onCall(
  async (): Promise<boolean> => {
    const ref = admin.database().ref('isConstruction');
    const snapshot = await ref.get();

    return snapshot.val();
  }
);

export default isConstruction;
