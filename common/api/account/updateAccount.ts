
export type UpdateAccountRequest = {
  name?: string;
}

export type UpdateAccountResponse = {
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
