import {
  reload as authReload,
  User,
} from 'firebase/auth';

export class AuthInfoLogin {
  readonly state = 'login';

  private user: User;
  constructor(user: User) {
    if (!user.emailVerified) {
      throw new Error('Account is not verified yet!');
    }
    this.user = user;
  }

  get name() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.user.displayName!;
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.user.email!;
  }

  async reload() {
    await authReload(this.user);
    return this.user;
  }
  
}
