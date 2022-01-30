
export type updateAccountRequest = {
  name?: string;
}

export type updateAccountResult = {
  result: 'success';
  userRecord: {
    uid: string;
    name?: string;
    email?: string;
  }
} | {
  result: 'unauthenticated';
} | {
  result: 'error';
  errorMessage: string;
}
