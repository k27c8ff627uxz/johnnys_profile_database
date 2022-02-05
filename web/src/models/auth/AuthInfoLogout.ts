import {
  Auth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export class AuthInfoLogout {
  readonly state = 'logout';
  
  private auth: Auth;
  constructor(auth: Auth) {
    this.auth = auth;
  }
  
  async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential;
  }
}
