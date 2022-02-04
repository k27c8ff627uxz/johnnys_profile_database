import {
  reload as authReload,
  User,
} from 'firebase/auth';

export class AuthInfoNotVerify {
  readonly state = 'notVerify';

  private user: User;
  constructor(user: User) {
    if (user.emailVerified) {
      throw new Error('Account is already verified!');
    }
    this.user = user;
  }

  async reload() {
    await authReload(this.user);
    return this.user;
  }
}
