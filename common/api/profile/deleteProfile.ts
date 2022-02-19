
export type DeleteProfileRequest = {
  id: string;
}

export type DeleteProfileResponse = {
  result: 'success';
  id: string;
} | {
  result: 'error';
  errorMessage: string;
}
