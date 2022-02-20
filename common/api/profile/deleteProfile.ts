
export type DeleteProfileRequest = {
  id: string;
}

export type DeleteProfileResponse = {
  result: 'success';
  id: string;
} | {
  result: 'unauthenticated';
} | {
  result: 'error';
  errorMessage: string;
}
