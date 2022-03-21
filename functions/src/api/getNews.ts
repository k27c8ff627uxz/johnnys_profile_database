import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const getNews = functions.https.onCall(
  async (): Promise<string[]> => {
    const ref = admin.database().ref('news');
    const snapshot = (await ref.get()).val();

    functions.logger.info(`get news: ${snapshot}`);

    if (!snapshot) {
      return [];
    }

    return snapshot;
  }
);

export default getNews;
