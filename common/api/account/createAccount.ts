
export type CreateAccountRequest = {
  name: string;
  email: string;
  password: string;
}

export type CreateAccountResponse = {
  result: true;
} | {
  result: false;
  errorMessage: string;
}
