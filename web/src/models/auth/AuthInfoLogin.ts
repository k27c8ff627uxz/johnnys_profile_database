import {
  reload as authReload,
  User,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
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

  async updatePassword(currentPassword: string, newPassword: string): Promise<'success' | 'failCredential' | 'failChange'> {
    const credential = EmailAuthProvider.credential(
      this.email,
      currentPassword,
    );
    try {
      await reauthenticateWithCredential(this.user, credential);
      try {
        await updatePassword(this.user, newPassword);
      } catch(e) {
        console.error(e);
        return 'failChange';
      }
      return 'success';
    } catch(e) {
      console.error(e);
      return 'failCredential';
    }
  }

  async deleteUser() {
    await deleteUser(this.user);
  }
  
}
