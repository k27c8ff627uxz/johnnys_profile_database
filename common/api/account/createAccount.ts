
export type CreateAccountRequest = {
  name: string;
  email: string;
  password: string;
}

export type CreateAccountResponse = {
  result: 'success';
} | {
  result: 'alreadyExist';
} | {
  result: 'error';
  errorMessage: string;
}
