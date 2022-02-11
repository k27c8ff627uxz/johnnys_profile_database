import {
  reload as authReload,
  User,
  signOut,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  Auth,
} from 'firebase/auth';
import { CustomUserClaim } from 'common/types/CustomUserClaim';

export class AuthInfoLogin {
  readonly state = 'login';

  private user: User;
  private auth: Auth;
  private customUserClaim: CustomUserClaim;
  constructor(auth: Auth, user: User, customUserClaim: CustomUserClaim) {
    if (!user.emailVerified) {
      throw new Error('Account is not verified yet!');
    }
    this.auth = auth;
    this.user = user;
    this.customUserClaim = customUserClaim;
  }

  get name() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.user.displayName!;
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.user.email!;
  }

  get customClaim() {
    return this.customUserClaim;
  }

  async reload() {
    await authReload(this.user);
    return this.user;
  }

  async logout() {
    await signOut(this.auth);
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
