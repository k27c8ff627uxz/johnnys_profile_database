import { v4 as uuidv4 } from 'uuid';

export function generateUUID(except: string[]) {
  let uid: string;
  do {
    uid = uuidv4();
  } while(except.find(prevUid => uid === prevUid) !== undefined);

  return uid;
}
