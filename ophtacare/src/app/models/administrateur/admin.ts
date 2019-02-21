export class Admin {
    public id: number;
    public enabled: boolean;
    public username: string;
    public password: string;
    public role: string;
    public name: string;
    public lastName: string;
    public token: string;

    constructor(
      id: number,
      enabled: boolean,
      username: string,
      password: string,
      role: string,
      name: string,
      lastName: string,
      token: string) { }
  }
