import {
  reload as authReload,
  Auth,
  User,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export class AuthInfoNotVerify {
  readonly state = 'notVerify';

  private user: User;
  private auth: Auth;
  constructor(auth: Auth, user: User) {
    if (user.emailVerified) {
      throw new Error('Account is already verified!');
    }
    this.user = user;
    this.auth = auth;
  }

  async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential;
  }

  async reload() {
    await authReload(this.user);
    return this.user;
  }

  async sendEmailVerification() {
    await sendEmailVerification(this.user);
  }
}
