import { IFormData } from './auth-interfaces';

// +--------------------------------------------------------------+
// |                                                              |
// |  ⚠️ INSTANCIATE FIRST: const auth = Singleton.getInstance()   |
// |                                                              |
// +--------------------------------------------------------------+

export class Authentication {
  email: boolean | string;
  token: boolean | string;
  avatar_url: boolean | string;

  constructor() {
    this.token = false;
    this.email = false;
    this.avatar_url = false;
  }

  getProp(key: 'email' | 'token' | 'avatar_url') {
    
    if (this[key]) {

      console.log(3.1)
      return this[key]

    } else {

      const cookies = document.cookie;
      const wholeCookies = cookies.split(';').map(str => str.trim());
      const keyValueCookies = wholeCookies.map(str => str.split('='));
      const theWholeCookie = keyValueCookies.find(cookie => cookie[0]===`${key}`);
      if (theWholeCookie) {
        return theWholeCookie[1];
      }
    }

    return false;

  }

  setProp(key: 'email' | 'token' | 'avatar_url', value: string) {
    document.cookie = `${key}=${value}`;
    return this[key] = value;
  }

  async checkTokenValidity(token?: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/check-token-validity`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token ?? this.token}`,
          },
        }
      );

      const status = response.status;

      if (status >= 200 && status < 300) {
        return await response.json();
      } else {
        return false;
      }
    } catch (error) {
      console.error(error); // TODO: handle error
      return false;
    }
  }

  async checkIsEmailVerified(email: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/check-email-verified`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      return await response.json();
    } catch (error) {
      console.error(error); // TODO: handle error
      return false;
    }
  }

  async emailAlreadyExists(email: string): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/email-already-exists`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error(error); // TODO: handle error
    }
  }

  async signUp(formData: IFormData): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/sign-up`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      return await response.json();
    } catch (error) {
      console.error(error); // TODO: handle error
    }
  }

  async signIn(formData: IFormData): Promise<any> {
    try {
      return await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/sign-in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
    } catch (error) {
      console.error(error); // TODO: handle error
    }
  }

  getUserData() {
    // store user table's data in redux
  }

  fetchAvatar(email: string) {
    try {
      // request for user avatar_url value
      // await fetch('https://google.com');
      return 'https://picsum.photos/200';
    } catch (error) {
      console.log(error)
    }
  }

  async hasAuthCookies(): Promise<boolean | undefined> {
    try {
      // setIsLoading(true)

      const string = document.cookie;
      const array = string.split(';');

      interface ICookie {
        [key: string]: string;
      }

      let jsCookies: ICookie = {};

      array.forEach((cookie) => {
        const cookieValues = cookie.split('=');
        const key = cookieValues[0]?.trim();
        const value = cookieValues[1]?.trim();
        jsCookies = { ...jsCookies, [key]: value };
      });

      const bool = await this.checkTokenValidity(jsCookies.token);

      if (bool) {
        this.setProp('token', jsCookies.token);
        this.setProp('email', jsCookies.email);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  removeCookies() {
    document.cookie = 'email=undefined';
    document.cookie = 'token=undefined';
  }
}

export class Singleton {
  private static instance: Authentication;

  private constructor() {}

  public static getInstance(): Authentication {
    if (!Singleton.instance) {
      Singleton.instance = new Authentication();
    }
    return Singleton.instance;
  }
}
