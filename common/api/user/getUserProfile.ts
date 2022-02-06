
export type GetUserProfileRequest = {
  uid?: string;
}

export type GetUserProfileResponse = {
  result: 'success';
  data: {
    uid: string;
    name: string;
    email: string;
  }[];
} | {
  result: 'notAuthenticated';
} | {
  result: 'error';
  errorMessage: string;
}
