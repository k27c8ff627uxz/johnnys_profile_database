
export type createAccountRequest = {
  name: string;
  email: string;
  password: string;
}

export type createAccountResult = {
  result: true;
} | {
  result: false;
  errorMessage: string;
}
