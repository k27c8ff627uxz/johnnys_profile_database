import * as functions from 'firebase-functions';

const workaroundTest = functions.https.onCall(
  async (): Promise<void> => {
    functions.logger.info('This is Test.');
  }
);

export default workaroundTest;
